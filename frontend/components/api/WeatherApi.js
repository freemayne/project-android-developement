import { useEffect, useState } from "react";
import { Alert, DeviceEventEmitter, Image, StyleSheet, Text, View } from "react-native";

const WeatherApi = ({ city }) => {
  const [weatherData, setWeatherData] = useState({});
  const [apiLoaded, setApiLoaded] = useState(false);
  const URL = 'http://10.0.2.2:3000'

  useEffect(() => {
    
    const callApi = () => {
        
     fetch(`${URL}/weather/${city}`)
     .then(res=>res.json())
   .then(body=>setWeatherData(body))
   .then(()=> setApiLoaded(true))
        };
    callApi();
  }, []);

  if (!apiLoaded) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        current weather in {weatherData.name}, {weatherData.sys.country}
      </Text>
      <Text style={styles.text}>
        <Image
          style={styles.weatherIcon}
          resizeMode='cover'
          source={{
            uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
          }}
        />
        {weatherData.weather[0].main + " "}
         {Math.floor(weatherData.main.temp - 273.15) + "°C"}
      </Text>
    </View>
  );
};

export default WeatherApi;

const styles = StyleSheet.create({
  container:{
   justifyContent:'center',
   borderBottomWidth:0.5,
   marginVertical:10,
   paddingBottom:10,
   borderBottomColor:'#706f6f60'
   
  },
  weatherIcon: {
    width: 24,
    height: 24,
  
  },
  text:{
    textAlign:'center',
    fontSize:10,
  }
});
