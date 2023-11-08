import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Header = ({time, currentTime, setCurrentTime, setTime}) => {
    const options = ['Pomodoro', 'Short Break', 'Long Break']

    const handlePress = (index) => {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTime(index);
        setTime(newTime * 60);
    }

    return (
        <View style={styles.container}>
            {options.map((option, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={[styles.options, 
                            currentTime !== index && 
                            {borderColor: 'transparent'}]}
                    onPress={() => handlePress(index)}
                    >
                    <Text style={{fontWeight: "bold"}}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    options: {
        width: "33%",
        borderWidth: 3,
        padding: 5,
        alignItems: 'center',
        borderColor: '#fff',
        marginVertical: 20,
        borderRadius: 10,
    },
});

export default Header;
