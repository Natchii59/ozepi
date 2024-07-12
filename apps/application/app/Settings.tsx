import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
}

const Button = ({ title, onPress }: ButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text >{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;