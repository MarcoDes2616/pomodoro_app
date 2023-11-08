import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import { Audio } from "expo-av";

export default function App() {
  const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsRunning(false);
      playSound();
      if (currentTime === 0) {
        setCurrentTime(1);
        setTime(5 * 60);
      } else if (currentTime === 1) {
        setCurrentTime(2);
        setTime(15 * 60);
      } else {
        setCurrentTime(0);
        setTime(25 * 60);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleState = () => {
    playSound();
    setIsRunning(!isRunning);
  }

  const playSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require("./assets/click.wav"));
      await soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={[styles.container, {backgroundColor: colors[currentTime]}]}>
      <Text style={styles.text}>Pomodoro</Text>
      <Header
        time={time}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        setTime={setTime}
      />
      <Timer time={time}/>
      <TouchableOpacity style={styles.touchable} onPress={handleState}>
        <Text style={{color: "white", fontWeight: "bold"}}>{isRunning ? "STOP" : "START"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 15
  },
  text: {
    fontWeight: "bold",
    fontSize: 30,
  },
  touchable: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "80%",
    alignSelf: "center"
  },
});
