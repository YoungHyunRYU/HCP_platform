import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

const HeartRateScreen = () => {
  const webViewRef = useRef(null);
  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://younghyunryu.github.io/platformPageHB/' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
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

export default HeartRateScreen;