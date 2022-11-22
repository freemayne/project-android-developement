import { useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "../customcomps/Button";
import {Ionicons} from '@expo/vector-icons'

const CameraComponent = ({image, setUriData}) => {
 
  const [status, requestPermission] = ImagePicker.useCameraPermissions()

  useEffect(() => {

    const getPermssion = async () => {

        console.log("statusCamera", status)

        if (status?.granted === false) {
            await requestPermission()
        }
        if (status?.canAskAgain === false) {
            Alert.alert("Insufficient camera permissions")
        }
    }

    getPermssion()

}, [status])


  const takeImageHandler = async () =>{
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    })
  
  console.log(result.assets)

  if(!result.canceled){
   
   setUriData(result.assets[0].uri)
  }

}

  let imageTaken = <Text>No image taken yet</Text>

  if(image){
    imageTaken = <Image source={{uri:image}} style={styles.image} />
  }



  return (
    <View style={{ alignItems:'center'}} >
      <View style={styles.imagePreview}>
      {imageTaken}

      </View>
      {!image && <Button onPress={takeImageHandler} > <Ionicons name='camera' size={18}  />Take image</Button>
}

    </View>
  )
};

export default CameraComponent;

const styles = StyleSheet.create({
  imagePreview:{
    width:'90%',
    height:200,
    marginVertical:8,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#3491bd73',
    borderRadius:4,
  },
  image:{
    width:'100%',
    height:'100%',
    borderWidth:1,
    borderColor:'gray',
    elevation:4,
    borderRadius:4,
  }
})