import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';

const PostsListItems = ({ item, index, onselectPost }) => {
    const [renderItem] = useState(item);

    return (
        <View id={index} style={tailwind('p-1')}>
            <TouchableOpacity style={tailwind('w-full p-2 flex-row justify-between')} onPress={() => { onselectPost(index) }}>
                <Text style={tailwind('text-gray-800 font-bold')}>{renderItem.data.text}</Text>
                <View style={tailwind('bg-red-800 px-3 py-1 rounded-md')}>
                    <Text style={tailwind('text-white font-semibold')}>
                        LIVE
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export { PostsListItems }