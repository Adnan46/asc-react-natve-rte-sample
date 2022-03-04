import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import tailwind from 'tailwind-rn';

const ButtonComponent = ({ textValue, style, onSubmit, textStyle }) => {
    return (
        <TouchableOpacity style={style ? style : tailwind('bg-indigo-600 w-5/12 py-2 items-center rounded-md mt-6')}
            onPress={() => onSubmit()}
        >
            <Text style={textStyle ? textStyle : tailwind('font-medium text-sm text-center')}>{textValue}</Text>
        </TouchableOpacity>
    );
}

export { ButtonComponent }