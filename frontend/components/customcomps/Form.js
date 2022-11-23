import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  DeviceEventEmitter,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Blog from "../../models/Blog";
import { insert } from "../../utils/db";
import CameraComponent from "../cameracomponent/CameraComponent";
import Button from "./Button";
import CustomInput from "./CustomInput";

const URL = "http://10.0.2.2:3000";

const Form = () => {
  const nav = useNavigation();

  const [inputs, setInputs] = useState({
    title: "",
    city: "",
    body: "",
  });
  const [imageUri, setImage] = useState("");
  const [cityError, setCityError] = useState(false);
  const [cityData, setCityData] = useState();

  const inputChangedHandler = (identifier, enteredValue) => {
    setInputs((curr) => {
      return { ...curr, [identifier]: enteredValue };
    });
  };

  const setImageHandler = (image) => {
    setImage(image);
  };

  const fetchCity = () => {
    console.log("formData", cityData.features[0]);
    if (
      cityData.features[0] !== undefined &&
      cityData.features[0].properties.name === undefined
    ) {
      insert(
        new Blog(undefined, inputs.title, inputs.city, imageUri, inputs.body)
      );
      DeviceEventEmitter.emit("addNewBlogPost");
      nav.navigate("blogscreen");
    } else {
      setCityError(true);
      Alert.alert("City not found", "check spelling and try again");
    }
  };

  useEffect(() => {
    if (cityData) {
      fetchCity();
    }
  }, [cityData]);

  const submitFormHandler = async () => {
    Keyboard.dismiss();
    const res = await fetch(`${URL}/findcity/${inputs.city}`);

    const result = await res.json();
    if (result) {
      setCityData(result);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <CustomInput
          inputConfig={{
            value: inputs.title,
            onChangeText: inputChangedHandler.bind(this, "title"),
          }}
          label="Title"
        />
        <CustomInput
          style={!cityError ? null : styles.inputError}
          inputConfig={{
            value: inputs.city,
            onChangeText: inputChangedHandler.bind(this, "city"),
          }}
          label="City"
        />
        <CustomInput
          inputConfig={{
            value: inputs.body,
            onChangeText: inputChangedHandler.bind(this, "body"),
            keyboardType: "default",
            multiline: true,
            blurOnSubmit: true,
          }}
          label="Body"
        />
        <CameraComponent setUriData={setImageHandler} image={imageUri} />
      </View>
      <Button onPress={submitFormHandler}>Submit</Button>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inputError: {
    backgroundColor: "#f15b5bbb",
  },
});
