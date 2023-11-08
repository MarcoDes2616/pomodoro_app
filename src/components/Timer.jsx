import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Timer = ({time}) => {

    const formatterTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{formatterTime(time)}</Text>
        </View>
    );
};

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#f2f2f2',
            padding: 15,
            borderRadius: 15,
            flex: 0.25,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontSize: 80,
            fontWeight: 'bold',
            color: '#575757',
        },
    });

export default Timer;