import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, PermissionsAndroid, Platform, Alert } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";

const requestPermissions = async () => {
  if (Platform.OS === "android") {
    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const granted = await PermissionsAndroid.request(permission);
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

const CameraScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const chooseImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
      if (response.assets?.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async () => {
    if (!imageUri) return Alert.alert("Please select an image first!");

    setUploadLoading(true);

    const fileName = imageUri.split("/").pop();
    const fileType = "image/jpeg";

    let formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: fileType,
      name: fileName,
    });

    try {
      const response = await axios.post(
        "http://10.0.2.2:3000/api/prescription/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log("Upload Progress:", progress + "%");
          },
        }
      );

      console.log("Upload Success:", response.data);
      Alert.alert("Success", "Image uploaded successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert("Error", "Failed to upload image!");
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select or Capture an Image</Text>

      <View style={styles.buttonContainer}>
        <Button title="Choose from Library" onPress={chooseImage} />
      </View>

      {imageUri && (
        <Button
          title={uploadLoading ? "Uploading..." : "Upload Image"}
          color="green"
          onPress={uploadImage}
        />
      )}

      <View style={styles.imagePlaceholder}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={{ width: 300, height: 300, borderRadius: 10 }} />
        ) : (
          <Text style={styles.placeholderText}>Selected Image</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  buttonContainer: { flexDirection: "row", marginBottom: 20 },
  imagePlaceholder: {
    width: 300, height: 300, backgroundColor: "#e0e0e0",
    justifyContent: "center", alignItems: "center",
    borderRadius: 10, marginTop: 20,
  },
  placeholderText: { color: "#888" },
});

export default CameraScreen;
