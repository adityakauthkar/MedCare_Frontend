import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";

const CameraScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select or Capture an Image</Text>
      <View style={styles.buttonContainer}>
        <Button title="Take Photo" onPress={() => {}} />
        <Button title="Choose from Library" onPress={() => {}} />
      </View>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.placeholderText}>Selected Image</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 300,
    height: 300,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  placeholderText: {
    color: "#888",
  },
});

export default CameraScreen;
