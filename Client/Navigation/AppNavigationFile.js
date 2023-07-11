import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens";
import OnboardingScreen from "../screens/OnboardingScreen";
import { Provider } from "react-redux";
import store from "../context/store";
import ProductDetails from "../screens/ProductDetails";
import BottomTabs from "../components/BottomTabs";
import CartScreen from "../screens/CartScreen";
import PaymentSuccessScreen from "../screens/PaymentSuccessScreen";
const Stack = createNativeStackNavigator();
const MyComponent = ({ setActiveScreen }) => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      const currentScreen = navigation.getCurrentRoute().name;
      setActiveScreen(currentScreen);
    });

    return unsubscribe;
  }, [navigation]);
};

const AppNavigationFile = () => {
  const [activeScreen, setActiveScreen] = useState("");
  return (
    <NavigationContainer>
      <MyComponent setActiveScreen={setActiveScreen} />
      <Provider store={store}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Splash" component={OnboardingScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentSuccessScreen} />
        </Stack.Navigator>
      </Provider>
      {activeScreen !== "Splash"  && <BottomTabs activeScreen={activeScreen} />}
      {activeScreen == "PaymentScreen"  ? <></>:<></> }
    </NavigationContainer>
  );
};

export default AppNavigationFile;

const styles = StyleSheet.create({});
