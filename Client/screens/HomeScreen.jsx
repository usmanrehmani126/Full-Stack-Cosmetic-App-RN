import {
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { fetchFeeds } from "../sanity";
import { useDispatch, useSelector } from "react-redux";
import { SET_FEEDS } from "../context/actions/feedsActions";
import Feeds from "../components/Feeds";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const feeds = useSelector((state) => state.feeds);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchFeeds().then((data) => {
      dispatch(SET_FEEDS(data));
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, [searchTerm, filtered]);
  const handleSearchTerm = (text) => {
    setSearchTerm(text);
    const data = feeds?.feeds.filter((item) => item.title.includes(text));
    setFiltered(data);
  };
  return (
    <SafeAreaView className="pt-6 flex-1 items-center justify-start bg-[#EBEAEF]">
      {/* Top Profile start View */}
      <View className="w-full flex-row items-center justify-between px-6 mt-4">
        <TouchableOpacity>
          <Entypo name="chevron-left" size={28} color="black" />
        </TouchableOpacity>
        <Text className="text-md text-gray-500">Welcome, Usman</Text>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/screen3.jpeg")}
            className="h-10 w-10 rounded-xl"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {/* Top Profile end View */}

      {/* Search Bar Start View */}
      <View className="w-full flex-row items-center py-2 px-2 space-x-3 mt-6">
        {/* TextInput Code Start Here */}
        <View className="bg-white rounded-xl px-4 py-2 flex-1 flex-row items-center mt-4 space-x-2">
          <EvilIcons name="search" size={26} color="#7f7f7f" />
          <TextInput
            onChangeText={handleSearchTerm}
            value={searchTerm}
            className="ml-4 text-base font-semibold tex-[#555] flex-1 py-1"
            placeholder="Search Here..."
          />
        </View>
        {/* TextInput Code end Here */}

        {/* Filter View Code Start Here */}
        <TouchableOpacity
          className="bg-white rounded-xl w-12 h-12 flex items-center justify-center mt-4"
          onPress={() => setVisible(!visible)}
        >
       <Image  source={require('../assets/fil.png')} className="w-6 h-6" />
        </TouchableOpacity>
        {/* Filter View Code end Here */}
      </View>
      {/* Search Bar end View */}

      {/* Product Listing start here */}
      <ScrollView
        className="flex-1 w-full mb-20"
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View className="flex-row items-center space-x-3 justify-center mt-40">
            <ActivityIndicator size="large" color="#f20" />
            <Text className="text-gray-400 text-xs">Loading, Please wait</Text>
          </View>
        ) : (
          <Feeds
            feeds={filtered || filtered?.length > 0 ? filtered : feeds?.feeds}
          />
        )}
      </ScrollView>
      {/*  Product Listing end here */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,.5)",
          }}
        >
          <View
            style={{
              width: "80%",
              height: 200,
              borderRadius: 10,
              backgroundColor: "#fff",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                let sortName = feeds?.feeds.sort((a, b) =>
                  a.title > b.title ? 1 : -1
                );
                setFiltered(sortName);
                setVisible(false);
              }}
              style={{
                width: "100%",
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: "center",
                paddingLeft: 20,
              }}
            >
              <Text style={{ fontSize: 18, color: "#000" }}> Sort By Name</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let sortByLtH = feeds?.feeds.sort((a, b) =>
                  a.price < b.price ? -1 : 1
                );
                setFiltered(sortByLtH);
                setVisible(false);
              }}
              style={{
                width: "100%",
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: "center",
                paddingLeft: 20,
              }}
            >
              <Text style={{ fontSize: 18, color: "#000" }}>
                Low to High Price
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let sortByLtH = feeds?.feeds.sort((a, b) =>
                  a.price > b.price ? -1 : 1
                );
                setFiltered(sortByLtH);
                setVisible(false);
              }}
              style={{
                width: "100%",
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: "center",
                paddingLeft: 20,
              }}
            >
              <Text style={{ fontSize: 18, color: "#000" }}>
                Hight to Low Price
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
