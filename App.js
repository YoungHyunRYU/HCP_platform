import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, Image,Platform, StatusBar } from 'react-native';
import { AuthProvider, useAuth } from './jsFile/context/AuthContext';
import DiseaseNavigator from './jsFile/DiseaseScreens';
import HeartRateScreen from './jsFile/screens/HeartRateScreen';
import ECGScreen from './jsFile/screens/ECGScreen';
import HospitalScreen from './jsFile/screens/HospitalScreen';
import CommunityScreen from './jsFile/screens/CommunityScreen';
import LoginHagi from './jsFile/LoginHagi';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Sidebar = ({ isVisible, onClose, navigation }) => {
  const diseases = [
    { name: '부정맥', screen: 'DiseaseInfo', params: { initialRoute: '부정맥' } },
    { name: '심근경색', screen: 'DiseaseInfo', params: { initialRoute: '심근경색증' } },
    { name: '심부전', screen: 'DiseaseInfo', params: { initialRoute: '심부전증' } },
    { name: '협심증', screen: 'DiseaseInfo', params: { initialRoute: '협심증' } }
  ];

  const handleDiseasePress = (screen, params) => {
    onClose();
    setTimeout(() => {
      navigation.navigate(screen, params);
    }, 100);
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={[styles.sidebarContainer, { paddingTop: Platform.OS === 'ios' ? 47 : StatusBar.currentHeight + 10 }]}>
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>질병 정보</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {diseases.map((disease, index) => (
            <TouchableOpacity
              key={index}
              style={styles.sidebarItem}
              onPress={() => handleDiseasePress(disease.screen, disease.params)}
            >
              <Text style={styles.sidebarItemText}>{disease.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};


const MainScreen = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: user.profile }} 
            style={styles.userProfile} 
          />
          <Text style={styles.welcomeText}>반갑습니다, {user.name}님!</Text>
        </View>
      )}
      <Text style={styles.title}>애플워치 건강 데이터 분석</Text>
      <Text style={styles.description}>
        당신의 심장에 관련한 다양한 정보를 알 수 있습니다
      </Text>
      <View style={styles.menuContainer}>
        <Image
          source={{ uri: 'https://www.apple.com/newsroom/images/product/apps/standard/Apple-Watch-ECG-app-12062018_big.gif.large_2x.gif' }}
          style={styles.gifImage}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('HeartRate')}>
          <Text>심박수</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ECG')}>
          <Text>심전도</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Hospital')}>
          <Text>병원정보</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Community')}>
          <Text>커뮤니티</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function TabNavigator() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      <Sidebar isVisible={isSidebarVisible} onClose={() => setSidebarVisible(false)} navigation={navigation} />
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Main') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'HeartRate') {
                iconName = focused ? 'heart' : 'heart-outline';
              } else if (route.name === 'ECG') {
                iconName = focused ? 'pulse' : 'pulse-outline';
              } else if (route.name === 'Hospital') {
                iconName = focused ? 'medical' : 'medical-outline';
              } else if (route.name === 'Community') {
                iconName = focused ? 'people' : 'people-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: 'gray',
            headerRight: () => (
              <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
                <Ionicons name="menu" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        >
          <Tab.Screen name="Main" component={MainScreen} options={{ title: '홈' }} />
          <Tab.Screen name="HeartRate" component={HeartRateScreen} options={{ title: '심박수' }} />
          <Tab.Screen name="ECG" component={ECGScreen} options={{ title: '심전도' }} />
          <Tab.Screen name="Hospital" component={HospitalScreen} options={{ title: '병원정보' }} />
          <Tab.Screen name="Community" component={CommunityScreen} options={{ title: '커뮤니티' }} />
        </Tab.Navigator>
      </View>
    </>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginHagi} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="MainTabs" 
            component={TabNavigator} 
            options={{ 
              headerShown: false,
              headerLeft: null,
              gestureEnabled: false 
            }} 
          />
          <Stack.Screen 
            name="DiseaseInfo" 
            component={DiseaseNavigator} 
            options={{ 
              title: '질병 정보',
              headerTitleAlign: 'center'
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    marginBottom: 10,
  },
  userProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  gifImage: {
    width: '100%',
    height: 200,
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  menuButton: {
    marginRight: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebarContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '70%',
    backgroundColor: 'white',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sidebarItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sidebarItemText: {
    fontSize: 16,
  },
  menuItem: {
  width: '48%',
  height: 100,
  backgroundColor: '#f0f0f0',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 15,
},
});

export default App;