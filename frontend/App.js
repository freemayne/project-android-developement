import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import BlogScreen from "./screens/BlogScreen";
import BlogItemScreen from "./screens/BlogItemScreen";
import { useEffect, useState } from "react";
import { getTableInfo, getTableInfo2, initDB } from "./utils/db";
import AddBlogScreen from "./screens/AddBlogScreen";




export default function App() {
  const [dbInited, setDbInited] = useState(false);
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    initDB()
      .then((res) => {
        console.log(res);
        return getTableInfo();
      })
      .then((res) => {
        console.log(
          res.rows._array.map((row) => `${row.cid} ${row.name} ${row.type}`)
        );
        setDbInited(true);
      });
  }, []);

  if (!dbInited) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }


  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
     

      <Stack.Navigator
       screenOptions={{
        headerBackground: () => (
          <LinearGradient
          colors={["#d2e94eff",  "#3bd88f86"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          />
          ),
         
         contentStyle: { backgroundColor: "#2df7b4" },
          headerShadowVisible:false,
        }}
        >
        <Stack.Screen
          name="blogscreen"
          component={BlogScreen}
          options={{
            
           
          }}
          />
        <Stack.Screen name="blogitemscreen" component={BlogItemScreen} 
        options={{
          
          }}
          
        />
        <Stack.Screen name="addblogscreen" component={AddBlogScreen}
         />
      </Stack.Navigator>
 
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({});
