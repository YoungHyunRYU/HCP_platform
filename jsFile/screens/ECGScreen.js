import React, { useRef, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, StyleSheet, Dimensions, ActivityIndicator, Alert } from 'react-native';

const ECGScreen = () => {
  const webViewRef = useRef(null);
  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;

  useEffect(() => {
    Alert.alert(
      '알림',
      'PC에서 사용가능한 기능입니다.',
      [{ text: '확인' }]
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://younghyunryu.github.io/ecgPage/' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        mixedContentMode="always"
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        renderLoading={() => (
          <ActivityIndicator 
            style={styles.loadingIndicator}
            size="large"
          />
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  webview: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }]
  }
});

export default ECGScreen;