import React from 'react';
import { View } from 'react-native';
import tailwind from 'tailwind-rn';

const CardComponent = ({ style, children }) => {
    return (
        <View style={style ? style : tailwind('bg-white rounded-lg p-3 justify-center items-center w-full')}>
            {children}
        </View>
    )
}

export { CardComponent }