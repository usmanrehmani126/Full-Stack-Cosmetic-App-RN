import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { addtocart } from "../context/actions/cartAction";
const ProductDetails = ({ route }) => {
  const { _id } = route.params;
  const feeds = useSelector((state) => state.feeds);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItem);
  const [data, setdata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const screenHeight = Math.round(Dimensions.get("window").height);
  useEffect(() => {
    setIsLoading(true);
    if (feeds) {
      setdata(feeds?.feeds.filter((data) => data._id === _id)[0]);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, []);

  const handleQty = (action) => {
    const newQty = qty + action;
    setQty(newQty >= 1 ? newQty : 1);
  };
  const navigation = useNavigation();

  const handlePressCart = () => {
    dispatch(addtocart({ data: data, qty: qty }));
  };
  return (
    <View className="flex-1 items-start justify-start bg-[#EBEAEF] space-y-4">
      {isLoading ? (
        <View className="flex-1 items-center justify-center flex w-full h-full">
          <ActivityIndicator
            size="large"
            color="#f20"
            style={{ alignSelf: "center" }}
          />
        </View>
      ) : (
        <>
          <SafeAreaView className="w-full mt-10 relative">
            <View className="flex-row items-center justify-between px-4 py-3 w-full">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Entypo name="chevron-left" size={28} color="#555" />
              </TouchableOpacity>
              {/* <MaterialCommunityIcons
                    name="cart-heart"
                    size={28}
                    color="#555"
                  /> */}
              <TouchableOpacity onPress={()=>navigation.navigate("CartScreen")}>
                {/* <Image
                  source={require("../assets/fil.png")}
                  className="w-8 h-8"
                /> */}
                 <MaterialCommunityIcons
                    name="cart-heart"
                    size={28}
                    color="#555"
                  />
              </TouchableOpacity>
              {/* <View className="bg-white rounded-full">
                <View className="bg-black w-6 h-6 items-center justify-center absolute rounded-full -top-4 -right-2">
                  <Text className="text-white">0</Text>
                </View>
                <TouchableOpacity className="w-8 h-8 rounded-full  items-center justify-center">
                  <MaterialCommunityIcons
                    name="cart-heart"
                    size={18}
                    color="#555"
                  />
                </TouchableOpacity>
              </View> */}
            </View>
            <View
              className="flex w-full items-center justify-center relative"
              style={{ height: screenHeight / 2 }}
            >
              <Image
                source={
                  { uri: data?.bgImage?.asset?.url }
                    ? { uri: data?.bgImage?.asset?.url }
                    : require("../assets/images/product-bg/7.png")
                }
                className="w-full h-full opacity-25"
                resizeMode="cover"
              />
              <View className="w-full h-full absolute top-0 left-0 items-center justify-center ">
                <Image
                  source={{ uri: data?.mainImage?.asset?.url }}
                  className="w-72 rounded-md h-72"
                  resizeMode="cover"
                />
              </View>
            </View>

            <View className="w-full flex-row items-center justify-evenly mb-4">
              {data?.categories &&
                data?.categories?.length > 0 &&
                data?.categories.map((value,index) => {
                  return (
                    <React.Fragment key={index}>
                      <View  className="p-2 w-24 rounded-xl flex items-center justify-center space-y-2 bg-white ">
                        <Image
                          source={{ uri: value?.mainImage?.asset?.url }}
                          className="w-6 rounded-md h-6 opacity-70"
                          resizeMode="cover"
                        />
                        <Text className="font-semibold text-xs text-[#555]">
                          {value.title}
                        </Text>
                      </View>
                    </React.Fragment>
                  );
                })}
            </View>
          </SafeAreaView>
          <View className="w-full flex-1 h-full bg-white rounded-t-[36px] py-6 px-8">
            <View className="w-full items-center justify-between flex-row mb-2">
              <View className="flex items-start justify-center">
                <Text className="text-xl font-semibold text-[#555]">
                  {data?.title}
                </Text>
                <Text className="text-sm font-semibold text-[#777]">
                  {data?.shortDescription}
                </Text>
              </View>
              <TouchableOpacity className="bg-black w-8 h-8 rounded-full flex items-center justify-center">
                <AntDesign name="heart" size={16} color="#fbfbfb" />
              </TouchableOpacity>
            </View>

            <View className="flex-row w-full items-center justify-between space-x-3">
              <Text className="text-xl font-bold text-black">
                Rs:{data?.price}
              </Text>

              <View className="flex-row items-center justify-center space-x-4 rounded-xl border border-gray-200 px-4 py-1">
                <TouchableOpacity onPress={() => handleQty(-1)}>
                  <Text className="text-xl font-bold text-[#555]">-</Text>
                </TouchableOpacity>
                <Text className="text-sm font-bold text-black">{qty}</Text>
                <TouchableOpacity onPress={() => handleQty(1)}>
                  <Text className="text-xl font-bold text-[#555]">+</Text>
                </TouchableOpacity>
              </View>
              {cartItems?.cart?.filter((item) => item?.data?._id === data?._id)
                ?.length > 0 ? (
                <TouchableOpacity className="bg-black px-4 py-2 rounded-xl">
                  <Text className="text-base font-semibold text-gray-50">
                    Added
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="bg-black px-3 py-2 rounded-md"
                  onPress={()=>handlePressCart()}
                >
                  <Text className="text-sm  text-gray-50">Add to Cart</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default ProductDetails;
