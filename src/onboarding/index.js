import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const OnboardingScreen = () => {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const result = await AsyncStorage.getItem('hasSeenOnboarding');
      if (result === 'true') {
        setOnboardingCompleted(true);
        navigation.navigate('Home');
      }
    };
    checkOnboardingStatus();
  }, [navigation]);

  const slides = [
    {
      key: 'slide1',
      image: require('../assets/medicineGIF1.gif'),
      title: 'Welcome to MedCare App',
      text: 'Here you can manage all your medicines',
    },
    {
      key: 'slide2',
      image: require('../assets/medicineGIF1.gif'),
      title: 'Track Your Medications',
      text: 'Keep track of your medication schedule and history',
    },
    {
      key: 'slide3',
      image: require('../assets/medicineGIF1.gif'),
      title: 'Stay Informed',
      text: 'Get the latest updates and reminders about your medicines',
    },
  ];

  const _renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const _renderNextButton = () => (
    <View style={styles.button}>
      <IonIcons name="md-arrow-forward" color="rgba(255,255,255,.9)" size={24} />
    </View>
  );

  const _renderDoneButton = () => (
    <View style={styles.button}>
      <IonIcons name="md-checkmark" color="rgba(255,255,255,.9)" size={24} />
    </View>
  );

  const _renderSkipButton = () => (
    <View style={styles.button}>
      <Text style={styles.skipText}>Skip</Text>
    </View>
  );

  const _onEndReached = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    setOnboardingCompleted(true);
    navigation.navigate('Home');
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={_renderItem}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      renderSkipButton={_renderSkipButton}
      onDone={_onEndReached}
      onSkip={_onEndReached}
      dotClickEnabled={true}
      showNextButton={true}
      showDoneButton={true}
      showSkipButton={true}
    />
  );
};

const styles = StyleSheet.create({
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 300, height: 300 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  text: { fontSize: 16, textAlign: 'center' },
  button: { padding: 10 },
  skipText: { color: 'rgba(255,255,255,.9)', fontSize: 16 },
});

export default OnboardingScreen;
