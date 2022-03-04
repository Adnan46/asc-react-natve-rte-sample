import React from 'react';
import { ActivityIndicator } from 'react-native';
import tailwind from 'tailwind-rn';

const LoadingComponent = () => {
    return (
        <View style={tailwind('bg-white rounded-lg p-6 w-full')}>
            <ActivityIndicator size="large" />
        </View>
    )
}

export { LoadingComponent }