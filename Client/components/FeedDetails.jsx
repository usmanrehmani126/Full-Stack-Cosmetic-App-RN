import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const FeedDetails = ({ item }) => {
  const screenWidth = Math.round(Dimensions.get("window").width);
  const cardWidth = screenWidth / 2 - 20;
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.navigate("ProductDetails", { _id: item?._id });
  };
  return (
    <Pressable
    onPress={handleClick}
      
      className="p-4 rounded-xl flex items-center justify-center bg-white m-2"
      style={{ width: cardWidth }}
    >
      <Image
        source={{
          uri: item?.mainImage?.asset?.url
            ? item?.mainImage?.asset?.url
            : "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=600",
        }}
        resizeMode="contain"
        className="w-36 h-32"
      />
      <View className="flex items-center justify-start space-y-2 w-full">
        <Text className="font-semibold text-sm text-[#555]">
          {item?.title ? item?.title : "Beauty Bliss Special"}
        </Text>
        <Text className="font-semibold text-sm text-[#555]">
          {item?.description
            ? item?.description.substring(0, 14) + "..."
            : "Make Up Set"}
        </Text>
      </View>
      <View className="flex-row items-center justify-between space-y-1 w-full">
        <Text className="font-semibold text-sm text-[#555]">
          Rs:{item?.price ? item?.price : 455}
        </Text>
        <TouchableOpacity>
          <Ionicons name="heart-circle" size={28} color="orange" />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default FeedDetails;
