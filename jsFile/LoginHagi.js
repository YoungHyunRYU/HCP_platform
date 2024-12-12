import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Image, StyleSheet } from 'react-native';
import { useAuth } from './context/AuthContext';

const LoginHagi = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const JSON_URL = 'https://raw.githubusercontent.com/YoungHyunRYU/platformPageHB/refs/heads/main/loginInfo.json';

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('알림', '이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    fetch(JSON_URL)
      .then(response => response.json())
      .then(users => {
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
          login(user);
          navigation.replace('MainTabs');
        } else {
          Alert.alert('로그인 실패', '이메일 또는 비밀번호가 일치하지 않습니다.');
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        Alert.alert('에러 발생', '로그인 처리 중 문제가 발생했습니다.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>로그인하기</Text>
      <Image
        source={require('../assets/login.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <TextInput
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity 
        style={styles.loginButton}
        onPress={handleLogin}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#3662AA',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3662AA',
    marginBottom: 20,
    textAlign: 'center'
},
});
export default LoginHagi;  