import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BottomTabs = ({ activeScreen }) => {
  const navigation = useNavigation();
  return (
    <View className="absolute bottom-1 w-full px-4">
      <View className="bg-[#130d2d] rounded-xl px-3 py-5 w-full flex-row items-center justify-around">
        <TouchableOpacity>
          <FontAwesome name="user" size={26} color="#5C5576" />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialIcons
            name="format-list-bulleted"
            size={26}
            color="#5C5576"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <FontAwesome
            name="home"
            size={26}
            color={activeScreen === "Home" ? "#fff" : "#5C5576"}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="collections" size={26} color="#5C5576" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <MaterialIcons
            name="shopping-cart"
            size={26}
            color={activeScreen === "CartScreen" ? "#fff" : "#5C5576"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
