import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "react-native-elements";
import { removeFromCart } from "../context/actions/cartAction";
const CartScreen = () => {
  const [total, setTotal] = useState(0);
  const cartItems = useSelector((state) => state.cartItem.cart);
  const navigation = useNavigation();
  const [dataCart, setDataCart] = useState(cartItems)
  useEffect(() => {
    let mainTotal = 0;
    if (dataCart.length > 0) {
      dataCart.map((item) => {
        mainTotal += item.data.price * item.qty;
        setTotal(mainTotal);
      });
    }
  }, [dataCart]);
  return (
    <View className="w-full flex-1 items-center justify-start bg-[#EBEAEF]">
      <View className="flex-row items-center justify-between px-4 py-3 w-full mt-6">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={28} color="#555" />
        </TouchableOpacity>

        <Text className="font-semibold text-[#555] text-xl">Shopping Bag</Text>
        <View className="bg-white rounded-xl w-10 h-10 flex-row items-center  justify-center relative">
          <MaterialIcons name="shopping-basket" size={18} color="black" />
          <View className="bg-black w-5 h-5 absolute rounded-full -top-1 right-0  flex items-center justify-center">
            <Text className="text-white">{cartItems?.length}</Text>
          </View>
        </View>
      </View>
      {cartItems.length === 0 || !cartItems ? (
        <View className="flex-1 items-center w-full p-4">
          <Text className="text-gray-500 text-xl">
            Opps! nothing in the Shopping Bag
          </Text>
          <Image
            source={require("../assets/emptycart.png")}
            className="h-[70%] w-full"
            resizeMode="contain"
          />
        </View>
      ) : (
        <ScrollView className="w-full flex-1 h-full">
          <View className="flex space-y-3">
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.data._id}
              renderItem={({ item }) => (
                <CartItemCard item={item.data} qty={item.qty} />
              )}
            />
          </View>
          <View className="w-full p-6">
            <View className="w-full px-2 h-16 rounded-xl bg-white flex-row items-center justify-center">
              <TextInput
                placeholder="Promo Code"
                className="text-base px-4 font-semibold text-[#555] flex-1 py-1"
              />
              <TouchableOpacity className="px-6 py-2 rounded-xl bg-black">
                <Text className="text-white text-lg">Apply</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-full px-8 flex space-y-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-[#555]">
                SubTotal
              </Text>
              <Text className="text-xl font-semibold text-black">
                Rs:{total.toFixed(2)}
              </Text>
            </View>
            <View className="bg-white w-full h-[2px]"></View>

            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-[#555]">
                Shipping
              </Text>
              <Text className="text-xl font-semibold text-black">
                Rs:300.00
              </Text>
            </View>
            <View className="bg-white w-full h-[2px]"></View>

            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-semibold text-[#555]">
                Grand Total
              </Text>
              <Text className="text-xl font-semibold text-black">
                Rs:{(total + 300).toFixed(2)}
              </Text>
            </View>
            <View className="w-full px-8" >
              <TouchableOpacity onPress={()=>{
                setDataCart([])
navigation.navigate("PaymentScreen")
              }} className="w-full bg-black rounded-full flex items-center justify-center py-3">
                <Text className="text-white text-lg">Ready to Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export const CartItemCard = ({ item, qty }) => {
  const dispatch = useDispatch();
  const pressToDelete = (_id) => {
    dispatch(removeFromCart(_id));
  };
  return (
    <View className="flex-row px-6 w-full items-center my-1">
      <View className="bg-white rounded-xl flex items-center justify-center p-2 w-14 h-14 relative">
        <Image
          source={
            { uri: item?.bgImage?.asset?.url }
              ? { uri: item?.bgImage?.asset?.url }
              : require("../assets/images/product-bg/7.png")
          }
          className="w-full h-full opacity-25"
          resizeMode="contain"
        />
        <View className="inset-0 absolute items-center justify-center ">
          <Image
            source={{ uri: item?.mainImage?.asset?.url }}
            className="w-12 rounded-md h-12"
            resizeMode="contain"
          />
        </View>
      </View>
      <View className="flex items-center space-y-2 ml-3">
        <View className="flex items-start justify-center ">
          <Text className="text-md font-semibold text-[#777]">
            {item?.title}
          </Text>
          <View className="flex-row items-center justify-center space-x-3">
            <Text className="text-lg  m font-semibold">
              Rs:{item?.price * qty}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-row items-center justify-center space-x-2 rounded-xl border border-gray-300 px-1 py-1 ml-auto">
        <Text className="text-sm font-semibold text-black">Qty:{qty}</Text>
        <Divider width={1} color="black" orientation="vertical" />
        <TouchableOpacity onPress={() => pressToDelete(item._id)}>
          <FontAwesome5 name="trash-restore" size={20} color="#777" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CartScreen;
