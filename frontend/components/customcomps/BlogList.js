import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";
import WeatherApi from "../api/WeatherApi";

const BlogList = ({ blogList }) => {
  const nav = useNavigation();

  const _renderItem = ({ item: blog }) => {
    return (
      <Pressable
        key={blog.id}
        onPress={() => nav.navigate("blogitemscreen", { blog })}
        style={styles.blog}
      >
        <Text style={[styles.text, styles.title]}>
          {blog.title.toUpperCase()}
        </Text>
        <View style={styles.imagePreview}>
          <Image style={styles.image} source={{ uri: blog.imageUri }} />
        </View>
        <WeatherApi city={blog.city} />
        <Text style={styles.text}>{blog.body}</Text>
      </Pressable>
    );
  };
  return (
    <FlatList
      style={{
        maxHeight: 650,
      }}
      contentContainerStyle={{
        margin: 10,
      }}
      data={blogList}
      renderItem={_renderItem}
    />
  );
};

export default BlogList;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  blog: {
    backgroundColor: "#b2e66db0",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    minWidth: deviceWidth * 0.75,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    textDecorationLine: "underline",
    textDecorationColor: "black",
  },
  image: {
    minWidth: "100%",
    height: "100%",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3491bd73",
    borderRadius: 4,
  },
});
