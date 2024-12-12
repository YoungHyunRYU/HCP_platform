import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const HospitalScreen = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const API_KEY = 'p5%2BwHG15mP76CNCwKauyRH5kRpkB%2BG7I6t94MiYn56FN13z5xJBTD1WMfTrH8pR%2BY2aNCAiehCJNY4CdmC36Fg%3D%3D';
  const API_URL = 'https://apis.data.go.kr/6260000/MedicInstitService/MedicalInstitInfo';

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    };

    const fetchHospitals = async () => {
      try {
        const response = await fetch(
          `${API_URL}?serviceKey=${API_KEY}&numOfRows=20&pageNo=1&resultType=json`
        );
        const data = await response.json();
        if (data && data.response && data.response.body) {
          setHospitals(data.response.body.items.item || []);
        }
      } catch (error) {
        console.error('병원 데이터 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getLocation();
    fetchHospitals();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {location && (
          <MapView 
            style={styles.map}
            initialRegion={location}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {!isLoading && hospitals.map((hospital, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(hospital.lat),
                  longitude: parseFloat(hospital.lng)
                }}
                title={hospital.instit_nm}
                description={hospital.street_nm_addr}
              />
            ))}
          </MapView>
        )}
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>병원 정보를 불러오는 중입니다...</Text>
        </View>
      ) : (
        <ScrollView style={styles.listContainer}>
          {hospitals.map((hospital, index) => (
            <View key={index} style={styles.hospitalItem}>
              <Text style={styles.hospitalName}>{hospital.instit_nm}</Text>
              <Text style={styles.hospitalInfo}>{hospital.street_nm_addr}</Text>
              <Text style={styles.hospitalInfo}>{hospital.tel}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 2,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hospitalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hospitalInfo: {
    fontSize: 14,
    color: '#666',
  }
});

export default HospitalScreen;