import { useNavigation } from "@react-navigation/native";
import {
  DeviceEventEmitter,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import WeatherApi from "../components/api/WeatherApi";
import Button from "../components/customcomps/Button";

const BlogItemScreen = ({ route }) => {
  const { id, title, city, imageUri, body } = route.params?.blog;

  const nav = useNavigation();

  const handleDelete = async () => {
    DeviceEventEmitter.emit("deleteById", id);
    nav.navigate("blogscreen");
  };

  return (
    <View>
      <View style={styles.blog}>
        <ScrollView>
          <Text style={[styles.text, styles.title]}>{title.toUpperCase()}</Text>

          <View style={styles.imagePreview}>
            <Image style={styles.image} source={{ uri: imageUri }} />
          </View>
          <WeatherApi city={city} />
          <Text style={styles.text}>{body}</Text>
        </ScrollView>
      </View>
      <Button onPress={handleDelete}>Delete</Button>
    </View>
  );
};

export default BlogItemScreen;

const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  blog: {
    backgroundColor: "#b2e66db0",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    minWidth: deviceWidth * 0.75,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    textDecorationLine: "underline",
    textDecorationColor: "black",
  },
  image: {
    minWidth: "100%",
    height: "100%",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3491bd73",
    borderRadius: 4,
  },
});
