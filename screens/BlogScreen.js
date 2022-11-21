import { useEffect, useState } from "react";
import { DeviceEventEmitter, StyleSheet, View } from "react-native";
import BlogList from "../components/customcomps/BlogList";

import IconButton from "../components/ui/IconButton";
import { deleteById, findAll } from "../utils/db";

const BlogScreen = ({ navigation }) => {
  const [blogList, setBlogList] = useState([]);
  useEffect(() => {
    findAll().then((res) => setBlogList(res));
    DeviceEventEmitter.addListener('addNewBlogPost', async () =>{
      const res = await findAll();
      setBlogList(res);
    })
    DeviceEventEmitter.addListener('deleteById', async (id) =>{
      await deleteById(id);
      const res = await findAll();
      setBlogList(res);
    })

    return () => DeviceEventEmitter.removeAllListeners();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: "My movie Reviews",
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="add"
          color={tintColor}
          size={24}
          onPress={({}) => navigation.navigate("addblogscreen")}
        />
      ),
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <BlogList blogList={blogList} />
    </View>
  );
};

export default BlogScreen;

const styles = StyleSheet.create({});
