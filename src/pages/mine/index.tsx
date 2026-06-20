import React from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { useAppContext } from '@/store/app-context';
import { getStatusText, getStatusColor, formatPrice } from '@/utils';
import Tag from '@/components/Tag';

const MinePage: React.FC = () => {
  const { reservations } = useAppContext();

  const menuGroups = [
    {
      title: '我的服务',
      items: [
        { icon: '📋', text: '预约记录', action: 'reservations' },
        { icon: '🔒', text: '锁价记录', action: 'locks' },
        { icon: '❤️', text: '我的收藏', action: 'favorites' }
      ]
    },
    {
      title: '帮助与支持',
      items: [
        { icon: '❓', text: '常见问题', action: 'faq' },
        { icon: '📞', text: '联系客服', action: 'service' },
        { icon: '⚙️', text: '设置', action: 'settings' }
      ]
    }
  ];

  const handleMenuClick = (action: string) => {
    if (action === 'reservations' || action === 'locks') {
      Taro.navigateTo({ url: '/pages/reservations/index' });
      return;
    }
    Taro.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  };

  const goAllReservations = () => {
    Taro.navigateTo({ url: '/pages/reservations/index' });
  };

  const activeReservations = reservations.slice(0, 2);

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.header}>
        <View className={styles.userInfo}>
          <View className={styles.avatar}>😊</View>
          <View className={styles.userDetail}>
            <Text className={styles.userName}>牙齿健康达人</Text>
            <Text className={styles.userDesc}>透明比价·放心看牙</Text>
          </View>
        </View>
      </View>

      <View className={styles.content}>
        <View className={styles.statsCard}>
          <View className={styles.statItem}>
            <Text className={styles.statNumber}>{reservations.length}</Text>
            <Text className={styles.statLabel}>预约记录</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statNumber}>{reservations.filter(r => r.status === 'locked').length}</Text>
            <Text className={styles.statLabel}>锁价中</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statNumber}>0</Text>
            <Text className={styles.statLabel}>已完成</Text>
          </View>
        </View>

        <View className={styles.section}>
          <View className={styles.sectionHeader}>
            <View className={styles.sectionTitle}>最近预约</View>
            {reservations.length > 0 && (
              <View className={styles.sectionMore} onClick={goAllReservations}>
                <Text className={styles.sectionMoreText}>查看全部</Text>
                <Text className={styles.sectionMoreArrow}>›</Text>
              </View>
            )}
          </View>
          {activeReservations.length > 0 ? (
            <View className={styles.reservationList}>
              {activeReservations.map(r => (
                <View
                  key={r.id}
                  className={styles.reservationItem}
                  onClick={() =>
                    Taro.navigateTo({
                      url: `/pages/reservation-detail/index?id=${r.id}`
                    })
                  }
                >
                  <View className={styles.reservationHeader}>
                    <Text className={styles.reservationName}>{r.packageName}</Text>
                    <Text
                      className={styles.reservationStatus}
                      style={{ color: getStatusColor(r.status) }}
                    >
                      {getStatusText(r.status)}
                    </Text>
                  </View>
                  <Text className={styles.reservationInfo}>{r.clinicName}</Text>
                  <View className={styles.reservationFooter}>
                    <Text className={styles.reservationPrice}>¥{formatPrice(r.price)}</Text>
                    {r.status === 'inapplicable' && (
                      <Tag text="待确认" type="warning" size="sm" />
                    )}
                    <Text className={styles.reservationArrow}>查看详情 ›</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className={styles.emptyReservation}>
              <Text className={styles.emptyReservationText}>暂无预约记录</Text>
              <View className={styles.emptyReservationBtn} onClick={goAllReservations}>
                <Text className={styles.emptyReservationBtnText}>去选择套餐</Text>
              </View>
            </View>
          )}
        </View>

        {menuGroups.map((group, idx) => (
          <View key={idx} className={styles.section}>
            <View className={styles.sectionTitle}>{group.title}</View>
            {group.items.map((item, itemIdx) => (
              <View
                key={itemIdx}
                className={styles.menuItem}
                onClick={() => handleMenuClick(item.action)}
              >
                <Text className={styles.menuIcon}>{item.icon}</Text>
                <Text className={styles.menuText}>{item.text}</Text>
                <Text className={styles.menuArrow}>›</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default MinePage;
