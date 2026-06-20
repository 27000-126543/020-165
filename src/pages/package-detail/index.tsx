import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import styles from './index.module.scss';
import { getPackageById } from '@/data/packages';
import { DentalPackage } from '@/types';
import PriceBreakdown from '@/components/PriceBreakdown';
import { formatPrice } from '@/utils';

const PackageDetailPage: React.FC = () => {
  const router = useRouter();
  const [pkg, setPkg] = useState<DentalPackage | null>(null);

  useEffect(() => {
    const id = router.params.id;
    if (id) {
      const found = getPackageById(id as string);
      if (found) {
        setPkg(found);
      }
    }
  }, [router.params.id]);

  const handleReserve = () => {
    if (pkg) {
      Taro.navigateTo({
        url: `/pages/reservation/index?id=${pkg.id}`
      });
    }
  };

  if (!pkg) {
    return (
      <View className={styles.page}>
        <Text>加载中...</Text>
      </View>
    );
  }

  return (
    <View className={styles.page}>
      <ScrollView scrollY>
        <View className={styles.header}>
          <Text className={styles.packageName}>{pkg.name}</Text>
          <View className={styles.clinicInfo}>
            <Text className={styles.clinicName}>{pkg.clinicName}</Text>
            <View className={styles.rating}>
              <Text className={styles.star}>★</Text>
              <Text className={styles.ratingText}>{pkg.rating}</Text>
            </View>
          </View>
          <View className={styles.priceRow}>
            <Text className={styles.priceSymbol}>¥</Text>
            <Text className={styles.price}>{formatPrice(pkg.price)}</Text>
            <Text className={styles.originalPrice}>¥{formatPrice(pkg.originalPrice)}</Text>
            {pkg.tag && <Text className={styles.tag}>{pkg.tag}</Text>}
          </View>
        </View>

        <View className={styles.content}>
          <View className={styles.section}>
            <Text className={styles.sectionTitle}>
              <Text className={styles.sectionIcon}>📦</Text>
              套餐包含
            </Text>
            {pkg.includes.map((item, index) => (
              <View key={index} className={styles.includeItem}>
                <Text className={styles.checkIcon}>✓</Text>
                <View className={styles.includeContent}>
                  <Text className={styles.includeName}>{item.name}</Text>
                  <Text className={styles.includeDesc}>{item.description}</Text>
                </View>
                <Text className={styles.includeCount}>×{item.count}</Text>
              </View>
            ))}
          </View>

          <View className={styles.section}>
            <Text className={styles.sectionTitle}>
              <Text className={styles.sectionIcon}>💰</Text>
              价格组成
            </Text>
            <PriceBreakdown breakdown={pkg.priceBreakdown} total={pkg.price} />
          </View>

          {pkg.extraItems.length > 0 && (
            <View className={styles.section}>
              <Text className={styles.sectionTitle}>
                <Text className={styles.sectionIcon}>⚠️</Text>
                可能另收项目
              </Text>
              {pkg.extraItems.map((item, index) => (
                <View key={index} className={styles.extraItem}>
                  <View className={styles.extraHeader}>
                    <Text className={styles.extraName}>{item.name}</Text>
                    <Text className={styles.extraPrice}>{item.priceRange}</Text>
                  </View>
                  <Text className={styles.extraDesc}>{item.description}</Text>
                </View>
              ))}
            </View>
          )}

          <View className={styles.section}>
            <Text className={styles.sectionTitle}>
              <Text className={styles.sectionIcon}>ℹ️</Text>
              套餐信息
            </Text>
            <View className={styles.infoRow}>
              <Text className={styles.infoLabel}>治疗时长</Text>
              <Text className={styles.infoValue}>{pkg.duration}</Text>
            </View>
            <View className={styles.infoRow}>
              <Text className={styles.infoLabel}>复诊次数</Text>
              <Text className={styles.infoValue}>{pkg.followUpCount}次</Text>
            </View>
            <View className={styles.infoRow}>
              <Text className={styles.infoLabel}>适应人群</Text>
              <View className={styles.suitableTags}>
                {pkg.suitableFor.map((s, i) => (
                  <Text key={i} className={styles.suitableTag}>{s}</Text>
                ))}
              </View>
            </View>
          </View>

          <View className={styles.section}>
            <Text className={styles.sectionTitle}>
              <Text className={styles.sectionIcon}>📝</Text>
              套餐说明
            </Text>
            <Text className={styles.descText}>{pkg.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View className={styles.bottomBar}>
        <View className={styles.bottomPrice}>
          <Text className={styles.bottomPriceText}>¥{formatPrice(pkg.price)}</Text>
          <Text className={styles.bottomPriceLabel}> 套餐价</Text>
        </View>
        <View className={styles.reserveBtn} onClick={handleReserve}>
          <Text className={styles.reserveBtnText}>立即锁价预约</Text>
        </View>
      </View>
    </View>
  );
};

export default PackageDetailPage;
