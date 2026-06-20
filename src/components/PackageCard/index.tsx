import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { DentalPackage } from '@/types';
import { formatPrice } from '@/utils';
import Tag from '../Tag';
import classnames from 'classnames';

interface PackageCardProps {
  pkg: DentalPackage;
  compact?: boolean;
  onClick?: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, compact = false, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      Taro.navigateTo({
        url: `/pages/package-detail/index?id=${pkg.id}`
      });
    }
  };

  return (
    <View className={classnames(styles.card, compact && styles.compact)} onClick={handleClick}>
      <View className={styles.cardHeader}>
        <View className={styles.titleRow}>
          <Text className={styles.packageName}>{pkg.name}</Text>
          {pkg.tag && <Tag text={pkg.tag} type="warning" size="sm" />}
        </View>
        <View className={styles.clinicInfo}>
          <Text className={styles.clinicName}>{pkg.clinicName}</Text>
          <View className={styles.rating}>
            <Text className={styles.star}>★</Text>
            <Text className={styles.ratingText}>{pkg.rating}</Text>
            <Text className={styles.reviewCount}>({pkg.reviewCount}人评价)</Text>
          </View>
        </View>
      </View>

      {!compact && (
        <View className={styles.includes}>
          <View className={styles.includesTitle}>
            <Text className={styles.includesTitleText}>套餐包含</Text>
          </View>
          <View className={styles.includesList}>
            {pkg.includes.slice(0, 3).map((item, index) => (
              <View key={index} className={styles.includeItem}>
                <Text className={styles.includeDot}>✓</Text>
                <Text className={styles.includeName}>{item.name}</Text>
                <Text className={styles.includeCount}>×{item.count}</Text>
              </View>
            ))}
            {pkg.includes.length > 3 && (
              <Text className={styles.moreText}>等{pkg.includes.length}项</Text>
            )}
          </View>
        </View>
      )}

      <View className={styles.cardFooter}>
        <View className={styles.priceInfo}>
          <Text className={styles.priceSymbol}>¥</Text>
          <Text className={styles.price}>{formatPrice(pkg.price)}</Text>
          <Text className={styles.originalPrice}>¥{formatPrice(pkg.originalPrice)}</Text>
        </View>
        <View className={styles.actionBtn}>
          <Text className={styles.actionText}>查看详情</Text>
        </View>
      </View>
    </View>
  );
};

export default PackageCard;
