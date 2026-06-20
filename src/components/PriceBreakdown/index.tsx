import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import { PriceBreakdown as PriceBreakdownType } from '@/types';
import { formatPrice } from '@/utils';

interface PriceBreakdownProps {
  breakdown: PriceBreakdownType;
  total: number;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ breakdown, total }) => {
  const items = [
    { key: 'doctorService', label: '医生服务费', value: breakdown.doctorService, icon: '👨‍⚕️' },
    { key: 'materials', label: '耗材费用', value: breakdown.materials, icon: '🦷' },
    { key: 'imaging', label: '影像检查费', value: breakdown.imaging, icon: '📷' },
    { key: 'followUp', label: '复查维护费', value: breakdown.followUp, icon: '🔄' }
  ];

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.title}>价格组成明细</Text>
        <Text className={styles.totalText}>总计 ¥{formatPrice(total)}</Text>
      </View>
      <View className={styles.barContainer}>
        <View className={styles.bar}>
          {items.map((item, index) => {
            const width = total > 0 ? (item.value / total) * 100 : 0;
            const colors = ['#36BFFA', '#52C41A', '#FF7D00', '#9B59B6'];
            return (
              <View
                key={item.key}
                className={styles.barSegment}
                style={{ width: `${width}%`, backgroundColor: colors[index] }}
              />
            );
          })}
        </View>
      </View>
      <View className={styles.itemList}>
        {items.map((item, index) => {
          const colors = ['#36BFFA', '#52C41A', '#FF7D00', '#9B59B6'];
          return (
            <View key={item.key} className={styles.item}>
              <View className={styles.itemLeft}>
                <View className={styles.itemIcon} style={{ backgroundColor: colors[index] + '20' }}>
                  <Text className={styles.iconText}>{item.icon}</Text>
                </View>
                <Text className={styles.itemLabel}>{item.label}</Text>
              </View>
              <Text className={styles.itemValue}>¥{formatPrice(item.value)}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PriceBreakdown;
