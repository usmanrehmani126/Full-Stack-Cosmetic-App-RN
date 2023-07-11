import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const value = await AsyncStorage.getItem("@onboarding_complete");
      if (value !== null && value === "true") {
        navigation.replace("Home");
      }
    };

    // checkOnboardingStatus();
  }, []);

  const handleOnboardingComplete = async (e) => {
    if (e === 2) {
      try {
        await AsyncStorage.setItem("@onboarding_complete", "true");
        navigation.navigate("Home");
      } catch (error) {
        console.log("Error on storing onboarding status : ", error);
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Swiper onIndexChanged={handleOnboardingComplete}>
        <ScreenOne />
        <ScreenTwo />
        <ScreenThree />
      </Swiper>
    </View>
  );
};

export const ScreenOne = () => {
  return (
    <View className="flex-1 items-center justify-center relative">
      <Image
        source={require("../assets/images/screen1.png")}
        className="w-full h-full"
        resizeMode="cover"
      />
      <View className="w-48 h-auto flex items-center justify-center p-2 absolute top-36 left-2">
        <Image
          source={require("../assets/brand.png")}
          className="h-32 w-32 "
          resizeMode="contain"
        />
        <Text className="text-xl font-semibold text-[#555]">
          Enchant Beauty
        </Text>
      </View>
    </View>
  );
};
export const ScreenTwo = () => {
  return (
    <View className="flex-1 items-center justify-start relative space-y-6">
      <Image
        source={require("../assets/images/screen2.jpg")}
        className="w-full h-[65%]"
        resizeMode="cover"
      />
      <View className="flex items-center justify-center px-6 space-y-6">
        <Text className="text-2xl tracking-wider text-[#555] ">
          Find your Beauty Products
        </Text>
        <Text className="text-md tracking-wider text-[#777] text-center">
          Beauty begins the moment you decide to be yourself
        </Text>
      </View>
    </View>
  );
};
export const ScreenThree = () => {
  return (
    <View className="flex-1 items-center justify-start relative space-y-6">
      <Image
        source={require("../assets/images/screen3.jpeg")}
        className="w-full h-[65%]"
        resizeMode="cover"
      />
      <View className="flex items-center justify-center px-4 space-y-6">
        <Text className="text-2xl tracking-widest text-[#555] ">
          Explore & Capture your Products
        </Text>
        <Text className="text-md tracking-wider text-[#777] text-center">
          Your beauty radiates from within.
        </Text>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});
