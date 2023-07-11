import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import FeedDetails from "./FeedDetails";

const Feeds = ({ feeds }) => {

  return (
    <View className="flex-row flex-wrap items-center justify-center">
      {feeds?.length > 0 ? (
        <>
          {feeds?.map((item, index) => {
            return <FeedDetails item={item} key={index} />;
          })}
        </>
      ) : (
        <View className="w-full items-center justify-center flex-row h-64 ">
          <ActivityIndicator size="large" color="#f20" />
          <Text>No Data</Text>
        </View>
      )}
    </View>
  );
};

export default Feeds;
