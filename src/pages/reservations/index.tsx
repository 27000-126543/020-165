import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { useAppContext } from '@/store/app-context';
import { getStatusText, getStatusColor, formatPrice, getIntentionText, getIntentionIcon } from '@/utils';
import Tag from '@/components/Tag';
import { ReservationStatus } from '@/types';
import classnames from 'classnames';

const filterOptions: { value: 'all' | ReservationStatus; label: string; type: 'default' | 'primary' | 'warning' | 'success' | 'error' }[] = [
  { value: 'all', label: '全部', type: 'default' },
  { value: 'locked', label: '已锁价', type: 'primary' },
  { value: 'inapplicable', label: '不适用待确认', type: 'warning' },
  { value: 'reconfirmed', label: '已重新确认', type: 'success' },
  { value: 'confirmed', label: '已确认', type: 'default' },
  { value: 'completed', label: '已完成', type: 'success' }
];

const ReservationsPage: React.FC = () => {
  const { reservations } = useAppContext();
  const [activeFilter, setActiveFilter] = useState<'all' | ReservationStatus>('all');

  const filteredReservations = useMemo(() => {
    const sorted = [...reservations].sort(
      (a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
    );
    if (activeFilter === 'all') return sorted;
    return sorted.filter(r => r.status === activeFilter);
  }, [reservations, activeFilter]);

  const goDetail = (id: string) => {
    Taro.navigateTo({ url: `/pages/reservation-detail/index?id=${id}` });
  };

  return (
    <View className={styles.page}>
      <View className={styles.filterBar}>
        <ScrollView scrollX className={styles.filterScroll} enable-flex showScrollbar={false}>
          <View className={styles.filterList}>
            {filterOptions.map(opt => (
              <View
                key={opt.value}
                className={classnames(
                  styles.filterItem,
                  activeFilter === opt.value && styles.filterActive
                )}
                onClick={() => setActiveFilter(opt.value)}
              >
                <Text
                  className={classnames(
                    styles.filterText,
                    activeFilter === opt.value && styles.filterTextActive
                  )}
                >
                  {opt.label}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View className={styles.statsBar}>
        <Text className={styles.statsText}>
          共{filteredReservations.length}条记录
        </Text>
      </View>

      <ScrollView className={styles.content} scrollY>
        {filteredReservations.length > 0 ? (
          <View className={styles.list}>
            {filteredReservations.map(r => (
              <View
                key={r.id}
                className={styles.card}
                onClick={() => goDetail(r.id)}
              >
                <View className={styles.cardHeader}>
                  <Text className={styles.packageName}>{r.packageName}</Text>
                  <View>
                    <Tag
                      text={getStatusText(r.status)}
                      type={
                        r.status === 'locked'
                          ? 'primary'
                          : r.status === 'inapplicable'
                          ? 'warning'
                          : r.status === 'reconfirmed' || r.status === 'completed'
                          ? 'success'
                          : 'default'
                      }
                      size="sm"
                    />
                  </View>
                </View>
                <Text className={styles.clinic}>{r.clinicName}</Text>
                <View className={styles.infoRow}>
                  <Text className={styles.priceLabel}>锁定价格</Text>
                  <Text className={styles.price}>¥{formatPrice(r.price)}</Text>
                </View>
                <View className={styles.infoRow}>
                  <Text className={styles.priceLabel}>有效期至</Text>
                  <Text className={styles.infoValue}>{r.expireDate}</Text>
                </View>

                {r.lastIntention && (
                  <View className={styles.intentionRow}>
                    <Text className={styles.intentionIcon}>
                      {getIntentionIcon(r.lastIntention)}
                    </Text>
                    <Text className={styles.intentionText}>
                      处理意向：{getIntentionText(r.lastIntention)}
                    </Text>
                  </View>
                )}

                {r.status === 'inapplicable' && r.inapplicableReason && (
                  <View className={styles.reasonRow}>
                    <Text className={styles.reasonText}>
                      ⚠️ {r.inapplicableReason}
                    </Text>
                  </View>
                )}

                <View className={styles.cardFooter}>
                  <Text className={styles.createTime}>{r.createTime}</Text>
                  <Text className={styles.arrow}>查看详情 ›</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className={styles.empty}>
            <Text className={styles.emptyIcon}>📋</Text>
            <Text className={styles.emptyText}>暂无相关记录</Text>
            <Text className={styles.emptyDesc}>
              {activeFilter === 'all'
                ? '快去选择套餐预约锁价吧'
                : '当前筛选条件下没有记录'}
            </Text>
            {activeFilter !== 'all' && (
              <View className={styles.emptyBtn} onClick={() => setActiveFilter('all')}>
                <Text className={styles.emptyBtnText}>查看全部记录</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ReservationsPage;
