import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {MaterialCommunityIcons} from '@expo/vector-icons'

import BlogScreen from "./screens/BlogScreen";
import BlogItemScreen from "./screens/BlogItemScreen";
import { useEffect, useState } from "react";
import { getTableInfo, getTableInfo2, initDB } from "./utils/db";
import AddBlogScreen from "./screens/AddBlogScreen";
import PokemonsScreen from "./screens/PokemonsScreen";

const Tab = createBottomTabNavigator();

const BlogOverview = () => {

return(

  <Tab.Navigator
  screenOptions={{
    tabBarInactiveTintColor:'#000000',
        tabBarActiveTintColor:'#000000',
    headerBackground: () => (
      <LinearGradient
        colors={["#fc1515ff", "#00000080", "#ffffff"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      />
    ),
    headerShadowVisible: true,

    tabBarBackground: () => (
      <LinearGradient
      colors={["#fc1515ff", "#00000080", "#ffffff"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      />
    ),
  
  }}
  >
    <Tab.Screen
      name="blogscreen"
      component={BlogScreen}
      options={{
      
        tabBarLabel: "Blog",
        
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="alpha-b-box-outline" color={color} size={size} />
        ),
      }}
      />
  {/*   <Tab.Screen name="pokemonsscreen" component={PokemonsScreen}
    options={{
      
      tabBarLabel: "Pokemon",
     
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="pokeball" color={color} size={size} />
      ),
    }}
    
    /> */}
  </Tab.Navigator>
      )
};

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
         
         contentStyle: { backgroundColor: "#3ba6d886" },
         
        }}
        >
        <Stack.Screen
          name="blogoverview"
          component={BlogOverview}
          options={{
            
            headerShown: false,
          }}
          />
        <Stack.Screen name="blogitemscreen" component={BlogItemScreen} 
        options={{
          headerBackground: () => (
            <LinearGradient
            colors={["#fc1515ff", "#00000080", "#ffffff"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            />
            ),
          }}
          
        />
        <Stack.Screen name="addblogscreen" component={AddBlogScreen}
        options={{
          headerBackground: () => (
            <LinearGradient
            colors={["#fc1515ff", "#00000080", "#ffffff"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            />
            ),
          }} />
      </Stack.Navigator>
 
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({});
