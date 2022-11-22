import { StyleSheet, Text, View, TextInput } from "react-native"


const CustomInput = ({style,label,inputConfig}) => {
  
 
  const inputStyles = [styles.input]
  if (inputConfig && inputConfig.multiline){
    inputStyles.push(styles.inputMultiline)
  }

  return (
      <View>

      <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <TextInput
      style={[inputStyles,style]}
      {...inputConfig} // gör att man kan konfigurera inputen i andra komponenter där man använder den.
      />
    </View>
      </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
  inputContainer:{
    flexDirection:'row',
    marginHorizontal:4,
    
    
  }, 
  input:{
    marginLeft:20,
    backgroundColor: "#ffffffa2",
    padding: 10,
    marginTop:10,
    width: "90%",
    borderRadius: 10,
  },
  label: {
    color: 'black',
    fontSize:18,
    marginTop:12,
    borderRadius:4,
    textAlign:'center',
    fontWeight:'bold'
    

  },inputMultiline:{
    minHeight:100,
    textAlignVertical:'top',
    maxHeight:150,
    
  },

})