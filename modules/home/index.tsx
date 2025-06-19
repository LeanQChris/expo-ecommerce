import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

const banners = [
  { id: "1", image: "https://i.imgur.com/QkIa5tT.jpeg" },
  { id: "2", image: "https://i.imgur.com/1twoaDy.jpeg" },
  { id: "3", image: "https://i.imgur.com/kg1ZhhH.jpeg" },
];

export default function Home() {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      setCurrentIndex(nextIndex);
      scrollRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {},
});
