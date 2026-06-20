import React from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { packagesData } from '@/data/packages';
import { demandOptions } from '@/data/questionnaire';
import PackageCard from '@/components/PackageCard';
import { useAppContext } from '@/store/app-context';
import { DemandType } from '@/types';

const HomePage: React.FC = () => {
  const { updateQuestionnaire, resetQuestionnaire } = useAppContext();

  const hotPackages = packagesData.slice(0, 3);

  const handleDemandClick = (demand: DemandType) => {
    resetQuestionnaire();
    updateQuestionnaire({ demand });
    Taro.navigateTo({
      url: '/pages/questionnaire/index'
    });
  };

  const goToPackages = () => {
    Taro.switchTab({
      url: '/pages/packages/index'
    });
  };

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.header}>
        <Text className={styles.headerTitle}>你好，欢迎使用</Text>
        <Text className={styles.headerSubtitle}>透明比价，放心看牙</Text>
        <View className={styles.trustBadge}>
          <Text className={styles.trustIcon}>🛡️</Text>
          <Text className={styles.trustText}>价格透明 · 无隐形消费</Text>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.demandSection}>
          <View className={styles.sectionHeader}>
            <Text className={styles.sectionTitle}>告诉我你的需求</Text>
            <Text className={styles.sectionDesc}>选一下，帮你找到合适的套餐</Text>
          </View>
          <View className={styles.demandGrid}>
            {demandOptions.map(option => (
              <View
                key={option.value}
                className={styles.demandCard}
                onClick={() => handleDemandClick(option.value)}
              >
                <Text className={styles.demandIcon}>{option.icon}</Text>
                <Text className={styles.demandName}>{option.label}</Text>
                <Text className={styles.demandDesc}>{option.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.sectionTitleRow}>
          <Text className={styles.sectionTitle}>热门套餐</Text>
          <Text className={styles.moreLink} onClick={goToPackages}>查看更多 →</Text>
        </View>

        <View className={styles.packageList}>
          {hotPackages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </View>

        <View className={styles.tipCard}>
          <Text className={styles.tipTitle}>
            <Text className={styles.tipIcon}>💡</Text>
            第一次看牙小贴士
          </Text>
          <Text className={styles.tipContent}>
            我们不直接替医生诊断，所有套餐仅供参考。具体治疗方案请以医生面诊为准。建议先拍片检查后，再确定最适合你的治疗方案。
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;
