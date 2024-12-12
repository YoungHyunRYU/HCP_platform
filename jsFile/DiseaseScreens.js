import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();

const InfoSection = ({ title, content }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionContent}>{content}</Text>
  </View>
);

const YoutubeSection = ({ url }) => (
  <View style={styles.youtubeSection}>
    <Text style={styles.youtubeSectionTitle}>관련 영상</Text>
    <TouchableOpacity 
      style={styles.youtubeButton}
      onPress={() => Linking.openURL(url)}
    >
      <Text style={styles.youtubeButtonText}>영상 보기</Text>
    </TouchableOpacity>
  </View>
);

const arrhythmiaScreen = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>부정맥</Text>
    <InfoSection  
      title="정의" 
      content="부정맥은 심장의 정상적인 리듬이 불규칙하게 변하는 상태를 말합니다. 심장이 너무 빠르게 뛰거나 너무 느리게 뛰거나 불규칙하게 뛰는 경우가 포함됩니다."
    />
    <InfoSection 
      title="증상"
      content="• 불규칙한 심장 박동
• 가슴 두근거림
• 어지러움
• 호흡 곤란
• 피로감"
    />
    <InfoSection 
      title="진단"
      content="• 심전도 검사
• 홀터 모니터링
• 운동부하 검사
• 심장초음파"
    />
    <YoutubeSection url="https://www.youtube.com/watch?v=QBuR3PfRUlA" />
  </ScrollView>
);

const anginaPectorisScreen = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>협심증</Text>
    <InfoSection 
      title="정의"
      content="협심증은 심장으로 가는 혈류가 줄어들어 가슴 통증이나 불편감을 유발하는 상태를 말합니다."
    />
    <InfoSection 
      title="증상"
      content="• 가슴 통증 또는 압박감
• 어깨나 팔로 퍼지는 통증
• 호흡 곤란
• 식은땀"
    />
    <InfoSection 
      title="예방"
      content="• 규칙적인 운동
• 금연
• 건강한 식단
• 스트레스 관리"
    />
    <YoutubeSection url="https://www.youtube.com/watch?v=FkC4erOOsSc" />
  </ScrollView>
);

const heartFailureScreen = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>심부전증</Text>
    <InfoSection 
      title="정의"
      content="심부전증은 심장이 혈액을 제대로 펌프질하지 못하여 신체의 필요한 부분에 충분한 혈액을 공급하지 못하는 상태를 말합니다."
    />
    <InfoSection 
      title="증상"
      content="• 호흡 곤란
• 피로감
• 다리 부종
• 기침"
    />
    <InfoSection 
      title="관리"
      content="• 약물 치료
• 생활습관 개선
• 정기적인 검진
• 운동 재활"
    />
    <YoutubeSection url="https://www.youtube.com/watch?v=PpNG2FMqAp0" />
  </ScrollView>
);

const myocardialInfarctionScreen = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>심근경색증</Text>
    <InfoSection 
      title="정의"
      content="심근병증은 심장의 근육이 비정상적으로 두꺼워지거나 얇아지며, 심장의 펌프 기능이 약해지는 상태를 말합니다."
    />
    <InfoSection 
      title="응급 증상"
      content="• 심한 가슴 통증
• 식은땀
• 호흡 곤란
• 오심과 구토"
    />
    <InfoSection 
      title="치료"
      content="• 응급 처치
• 약물 치료
• 수술적 치료
• 재활 프로그램"
    />
    <YoutubeSection url="https://www.youtube.com/watch?v=FkC4erOOsSc" />
  </ScrollView>
);

const DiseaseNavigator = ({ route }) => {
  const initialRoute = route.params?.initialRoute || '부정맥';
  
  return (
    <TopTab.Navigator initialRouteName={initialRoute}>
      <TopTab.Screen name="부정맥" component={arrhythmiaScreen} />
      <TopTab.Screen name="협심증" component={anginaPectorisScreen} />
      <TopTab.Screen name="심부전증" component={heartFailureScreen} />
      <TopTab.Screen name="심근경색증" component={myocardialInfarctionScreen} />
    </TopTab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
  },
  youtubeSection: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  youtubeSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
  },
  youtubeButton: {
    backgroundColor: '#FF0000',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  youtubeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default DiseaseNavigator;