import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const PaymentSuccessScreen = () => {
    const navigation=useNavigation()
    useEffect(()=>{
        setTimeout(() => {
            navigation.navigate("Home")
        }, 7000)
        
    })
  return (
    <View className=" flex flex-1 items-center justify-center">
    <LottieView
          style={{ height: 500, alignSelf: "center", marginBottom: 30 }}
          source={require("../assets/successPayment.json")}
          autoPlay
          speed={0.5}
          loop={false}
        />
    </View>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({});
