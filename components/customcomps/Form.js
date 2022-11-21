import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { DeviceEventEmitter, Keyboard, StyleSheet, Text, View } from "react-native"
import Blog from "../../models/Blog"
import {insert} from "../../utils/db"
import CameraComponent from "../cameracomponent/CameraComponent"
import Button from "./Button"
import CustomInput from "./CustomInput"


const Form = () => {

  const nav = useNavigation()

  const [inputs, setInputs] = useState({
    title:'',
    body:'',

  })
  const [imageUri, setImage] = useState('')

const inputChangedHandler = (identifier, enteredValue)=>{
  setInputs((curr) =>{
    return {...curr, [identifier]: enteredValue}
  })
  
  console.log(inputs)
}

const setImageHandler = (image) =>{
  setImage(image)

}

const submitFormHandler = async () =>{
  Keyboard.dismiss()
  await insert(new Blog(undefined, inputs.title, imageUri ,inputs.body))
  
 
  DeviceEventEmitter.emit('addNewBlogPost')
  
  nav.navigate('blogscreen')
}
  return (
    
    <View style={styles.container}>
     

    <Text style={styles.title}>Add Blog Post</Text>
     <View  >

    <CustomInput inputConfig={{
      value:inputs.title,
      onChangeText:inputChangedHandler.bind(this, 'title')
      
    }} label='Title' />
    <CustomInput
    
    inputConfig={{
      value:inputs.body,
      onChangeText:inputChangedHandler.bind(this, 'body'),
      keyboardType: "default",
      multiline: true,
      
      
    }}
    label='Body' />
    <CameraComponent
    setUriData={setImageHandler}
    image={imageUri}
    />
    </View>
    <Button onPress={submitFormHandler} >Submit</Button>

    </View>
  )
}

export default Form

const styles = StyleSheet.create({
 
  container:{
    
    
    alignItems:'center',
    justifyContent:'center',
    marginTop:36
  },
  title:{
    fontSize:18,
    fontWeight:'bold',
    
  }
})