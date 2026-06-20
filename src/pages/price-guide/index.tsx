import React from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import styles from './index.module.scss';
import { PriceGuideItem } from '@/types';

const priceGuideData: PriceGuideItem[] = [
  {
    category: '医生服务费',
    icon: '👨‍⚕️',
    items: [
      { name: '初诊检查费', description: '包括口腔检查、问诊、初步方案建议', priceRange: '50-200元' },
      { name: '治疗操作费', description: '根据治疗难度和时长计算', priceRange: '200-3000元' },
      { name: '复诊检查费', description: '术后复查、效果评估', priceRange: '50-150元/次' }
    ]
  },
  {
    category: '耗材费用',
    icon: '🦷',
    items: [
      { name: '补牙材料', description: '树脂材料分国产和进口,价格不同', priceRange: '100-800元/颗' },
      { name: '美白剂', description: '美白凝胶、美白剂等', priceRange: '300-1500元' },
      { name: '种植体', description: '韩国、欧美等不同品牌', priceRange: '2000-8000元/颗' },
      { name: '牙冠', description: '烤瓷冠、全瓷冠等', priceRange: '500-5000元/颗' }
    ]
  },
  {
    category: '影像检查费',
    icon: '📷',
    items: [
      { name: '口腔全景片', description: '全面了解口腔情况', priceRange: '80-200元' },
      { name: '根尖片', description: '单颗牙齿详细检查', priceRange: '30-80元/张' },
      { name: '口腔CT', description: '三维影像,种植等复杂治疗需要', priceRange: '200-600元' }
    ]
  },
  {
    category: '维护复查费',
    icon: '🔄',
    items: [
      { name: '定期复查', description: '治疗后跟踪效果', priceRange: '50-200元/次' },
      { name: '洁牙维护', description: '种植牙等需要定期维护', priceRange: '100-400元/次' },
      { name: '质保服务', description: '部分项目含保修期内免费', priceRange: '含在套餐内' }
    ]
  }
];

const PriceGuidePage: React.FC = () => {
  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.header}>
        <Text className={styles.headerTitle}>价格透明，放心消费</Text>
        <Text className={styles.headerDesc}>
          每一分钱都花得明明白白，拒绝隐形消费
        </Text>
      </View>

      <View className={styles.content}>
        {priceGuideData.map((category, idx) => (
          <View key={idx} className={styles.section}>
            <Text className={styles.sectionTitle}>
              <Text className={styles.sectionIcon}>{category.icon}</Text>
              {category.category}
            </Text>
            {category.items.map((item, itemIdx) => (
              <View key={itemIdx} className={styles.item}>
                <View className={styles.itemHeader}>
                  <Text className={styles.itemName}>
                    <View className={styles.itemDot} />
                    {item.name}
                  </Text>
                  <Text className={styles.itemPrice}>{item.priceRange}</Text>
                </View>
                <Text className={styles.itemDesc}>{item.description}</Text>
              </View>
            ))}
          </View>
        ))}

        <View className={styles.noticeCard}>
          <Text className={styles.noticeTitle}>
            <Text className={styles.noticeIcon}>💡</Text>
            温馨提示
          </Text>
          <View className={styles.noticeContent}>
            <View className={styles.noticeItem}>
              <Text>• 以上价格为参考范围，具体以诊所实际收费为准</Text>
            </View>
            <View className={styles.noticeItem}>
              <Text>• 套餐价格通常比单项购买更优惠</Text>
            </View>
            <View className={styles.noticeItem}>
              <Text>• 治疗前医生会告知预估总费用，确认后再开始治疗</Text>
            </View>
            <View className={styles.noticeItem}>
              <Text>• 如治疗过程中如需增加项目，会先与您沟通确认</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PriceGuidePage;
