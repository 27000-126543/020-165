import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import styles from './index.module.scss';
import { packagesData } from '@/data/packages';
import { demandOptions } from '@/data/questionnaire';
import PackageCard from '@/components/PackageCard';
import { DemandType } from '@/types';
import classnames from 'classnames';

type SortType = 'default' | 'price-asc' | 'price-desc' | 'rating';

const PackagesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DemandType | 'all'>('all');
  const [sortType, setSortType] = useState<SortType>('default');

  const filteredPackages = useMemo(() => {
    let result = [...packagesData];

    if (activeTab !== 'all') {
      result = result.filter(pkg => pkg.category === activeTab);
    }

    switch (sortType) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [activeTab, sortType]);

  const tabs = [
    { value: 'all' as const, label: '全部' },
    ...demandOptions.map(opt => ({ value: opt.value, label: opt.label }))
  ];

  return (
    <View className={styles.page}>
      <ScrollView className={styles.tabBar} scrollX>
        {tabs.map(tab => (
          <View
            key={tab.value}
            className={classnames(styles.tabItem, activeTab === tab.value && styles.active)}
            onClick={() => setActiveTab(tab.value)}
          >
            <Text className={styles.tabText}>{tab.label}</Text>
          </View>
        ))}
      </ScrollView>

      <View className={styles.filterBar}>
        <View
          className={classnames(styles.filterBtn, sortType === 'default' && styles.active)}
          onClick={() => setSortType('default')}
        >
          <Text className={styles.filterText}>综合</Text>
        </View>
        <View
          className={classnames(styles.filterBtn, sortType === 'price-asc' && styles.active)}
          onClick={() => setSortType('price-asc')}
        >
          <Text className={styles.filterText}>价格↑</Text>
        </View>
        <View
          className={classnames(styles.filterBtn, sortType === 'price-desc' && styles.active)}
          onClick={() => setSortType('price-desc')}
        >
          <Text className={styles.filterText}>价格↓</Text>
        </View>
        <View
          className={classnames(styles.filterBtn, sortType === 'rating' && styles.active)}
          onClick={() => setSortType('rating')}
        >
          <Text className={styles.filterText}>好评</Text>
        </View>
      </View>

      <ScrollView className={styles.packageList} scrollY>
        {filteredPackages.length > 0 ? (
          filteredPackages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>🦷</Text>
            <Text className={styles.emptyText}>暂无相关套餐</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PackagesPage;
