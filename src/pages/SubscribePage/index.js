import React from 'react'
import {
  queryPosts,
  queryComments,
  observePosts,
  getStream,
  createQuery,
  runQuery,
  getCommunityTopic,
  getCommunity,
  SubscriptionLevels,
  subscribeTopic,
  onPostCreated,
  onPostUpdated,
  onPostDeleted,
  onPostFlagged,
  onPostReactionAdded,
  onPostReactionRemoved,
  onCommentCreated,
  getPostTopic,
  getPost,
} from '@amityco/ts-sdk'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import useAuth from '../../hooks/useAuth'
import tailwind from 'tailwind-rn'
import { PostsListItems } from './postListItem'
import { useEffect, useState } from 'react/cjs/react.development'

import { communityId } from '../../../app.json'

const SubscribePage = ({ navigation }) => {
  const [community, setCommunity] = useState()
  const [postList, setPostList] = useState([])
  const [amityCommunityId] = useState(communityId)

  const { logout } = useAuth()

  useEffect(() => {
    const query = createQuery(getCommunity, amityCommunityId)

    runQuery(query, ({ data }) => setCommunity(data))

    onPostCreated((post) => {
      if (post.targetId === amityCommunityId) {
        console.log('onPostCreated in this community - - - - - -', post)
      }
    })
    onPostUpdated((post) => {
      if (post.targetId === amityCommunityId) {
        console.log('onPostUpdated in this community - - - - - -', post)
      }
    })
    onPostDeleted((post) => {
      if (post.targetId === amityCommunityId) {
        console.log('onPostDeleted in this community - - - - - -', post)
      }
    })
    onPostFlagged((post) => {
      if (post.targetId === amityCommunityId) {
        console.log('onPostFlagged in this community - - - - - -', post)
      }
    })
    onPostReactionAdded((post) => {
      if (post.targetId === amityCommunityId) {
        console.log('onPostReactionAdded in this community - - - - - -', post)
      }
    })
  }, [])

  useEffect(() => {
    if (!community?.path) {
      return
    }
    console.log(community)
    return subscribeTopic(
      getCommunityTopic(community, SubscriptionLevels.POST_AND_COMMENT),
    )
  }, [community?.path])

  useEffect(() => {
    const query = createQuery(queryPosts, {
      targetId: amityCommunityId,
      targetType: 'community',
      sortBy: 'lastCreated',
      isDeleted: false,
      feedType: 'published',
    })

    let postsResult = []
    runQuery(query, ({ data }) => {
      if (data != undefined) {
        const result = []
        console.log(JSON.stringify(data))
        for (let i in data) {
          result.push(data[i])
        }
        setPostList(result)
      }
    })

    observePosts({ targetId: amityCommunityId }, ({ data }) => {
      console.log('OBSERVE')
      console.log(data)
      setPostList([])
      postsResult.push(data)
      setPostList(postsResult)
    })
  }, [])

  const navigateBack = async () => {
    logout()
    navigation.goBack()
  }

  const onselectPost = (index) => {
    console.log(index)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={tailwind('w-full pt-2 flex-row items-center')}>
        <TouchableOpacity
          onPress={() => {
            navigateBack()
          }}
        >
          <ChevronLeftIcon size={42} color={'black'} />
        </TouchableOpacity>
        <Text style={tailwind('font-extrabold pl-2')}>
          {'WATCH SOMETHING NEW'}
        </Text>
      </View>
      {postList.length > 0 ? (
        <FlatList
          style={tailwind('h-2/4 w-full')}
          data={postList}
          renderItem={({ item, index }) => {
            return (
              <PostsListItems
                item={item}
                index={index}
                onselectPost={onselectPost}
              />
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        ></FlatList>
      ) : undefined}
    </SafeAreaView>
  )
}

export { SubscribePage }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
  },
})
