import { useEffect, useState } from "react";
import { DeviceEventEmitter, ImageBackground, StyleSheet, Text, View } from "react-native";
import WeatherApi from "../components/api/WeatherApi";
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
      console.log(res)
      
    })
    DeviceEventEmitter.addListener('deleteById', async (id) =>{
      await deleteById(id);
      const res = await findAll();
      setBlogList(res);
    })
    
    console.log(blogList)
    return () => DeviceEventEmitter.removeAllListeners();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: "My travel diary",
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
    
      <ImageBackground style={styles.container} source={require('../assets/pngwing.com.png')}
    resizeMode="contain"
    
    
    >
     <BlogList blogList={blogList} /> 
      
      </ImageBackground>
    
    
  );
};

export default BlogScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
   
  },
 
});
