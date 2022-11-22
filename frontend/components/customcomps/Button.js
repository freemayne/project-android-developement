import { Pressable, StyleSheet, Text } from 'react-native'

const Button = ({onPress,children}) => {
  return (
   <Pressable onPress={onPress} style={({pressed})=>
    [styles.button, pressed && styles.pressed]
   }>
    <Text style={styles.text}>{children}</Text>
   </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    backgroundColor:'#4964dd5e',
    paddingHorizontal:12,
    paddingVertical:6,
    margin:10,
    justifyContent:'center',
    alignItems:'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius:4,
  },
  pressed:{
    opacity:0.7
  },
  text:{
    fontSize:18,
    fontWeight:'bold'
  }
})