import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import styles from './index.module.scss';
import { getPackageById } from '@/data/packages';
import { DentalPackage, ReservationRecord } from '@/types';
import { useAppContext } from '@/store/app-context';
import { formatDate, addDays, formatPrice } from '@/utils';
import classnames from 'classnames';

const ReservationPage: React.FC = () => {
  const router = useRouter();
  const { addReservation } = useAppContext();
  const [pkg, setPkg] = useState<DentalPackage | null>(null);
  const [selectedDays, setSelectedDays] = useState<number>(3);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const id = router.params.id;
    if (id) {
      const found = getPackageById(id as string);
      if (found) {
        setPkg(found);
      }
    }
  }, [router.params.id]);

  const lockDays = [3, 7, 14];

  const lockDate = useMemo(() => formatDate(new Date()), []);
  const expireDate = useMemo(() => formatDate(addDays(new Date(), selectedDays)), [selectedDays]);

  const canSubmit = useMemo(() => {
    return pkg && name.trim() && phone.trim().length === 11;
  }, [pkg, name, phone]);

  const handleSubmit = () => {
    if (!canSubmit || !pkg) return;

    const newReservation: ReservationRecord = {
      id: `res-${Date.now()}`,
      packageId: pkg.id,
      packageName: pkg.name,
      clinicName: pkg.clinicName,
      price: pkg.price,
      lockDate,
      expireDate,
      status: 'locked',
      createTime: `${lockDate} ${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`
    };

    addReservation(newReservation);
    setShowSuccess(true);

    console.log('[Reservation] 锁价成功:', newReservation);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    Taro.switchTab({
      url: '/pages/mine/index'
    });
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
      <View className={styles.packageInfo}>
        <Text className={styles.packageName}>{pkg.name}</Text>
        <Text className={styles.clinicName}>{pkg.clinicName}</Text>
        <View className={styles.priceRow}>
          <Text className={styles.price}>¥{formatPrice(pkg.price)}</Text>
          <Text className={styles.priceLabel}>套餐价格</Text>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>锁价信息</Text>

        <View className={styles.formItem}>
          <Text className={styles.formLabel}>
            <Text className={styles.required}>*</Text>
            锁价有效期
          </Text>
          <View className={styles.dateOptions}>
            {lockDays.map(days => (
              <View
                key={days}
                className={classnames(
                  styles.dateOption,
                  selectedDays === days && styles.selected
                )}
                onClick={() => setSelectedDays(days)}
              >
                <Text className={styles.dateDay}>{days}天</Text>
                <Text className={styles.dateText}>锁定价格</Text>
              </View>
            ))}
          </View>
          <View className={styles.lockInfo}>
            <Text className={styles.lockInfoText}>
              <Text className={styles.lockInfoHighlight}>🔒 价格锁定保障</Text>
              {'\n'}
              锁价期间到店，如套餐价格上涨，仍按当前价格执行
            </Text>
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>联系信息</Text>

        <View className={styles.formItem}>
          <Text className={styles.formLabel}>
            <Text className={styles.required}>*</Text>
            姓名
          </Text>
          <View className={styles.inputRow}>
            <Input
              className={styles.input}
              placeholder="请输入您的姓名"
              value={name}
              onInput={e => setName(e.detail.value)}
              maxlength={20}
            />
          </View>
        </View>

        <View className={styles.formItem}>
          <Text className={styles.formLabel}>
            <Text className={styles.required}>*</Text>
            手机号
          </Text>
          <View className={styles.inputRow}>
            <Input
              className={styles.input}
              type="number"
              placeholder="请输入手机号"
              value={phone}
              onInput={e => setPhone(e.detail.value)}
              maxlength={11}
            />
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.notice}>
          <Text className={styles.noticeTitle}>
            <Text className={styles.noticeIcon}>⚠️</Text>
            重要说明
          </Text>
          <Text className={styles.noticeContent}>
            1. 本套餐价格为参考价，具体治疗方案需医生面诊后确定{'\n'}
            2. 如医生判断套餐不适用，系统会提示重新确认，并保留沟通记录{'\n'}
            3. 锁价期内可随时取消预约，不会产生任何费用{'\n'}
            4. 到店请出示预约记录，按预约时间就诊
          </Text>
        </View>
      </View>

      <View className={styles.bottomBar}>
        <View className={styles.totalRow}>
          <Text className={styles.totalLabel}>锁价总价</Text>
          <Text className={styles.totalPrice}>¥{formatPrice(pkg.price)}</Text>
        </View>
        <View
          className={classnames(styles.confirmBtn, !canSubmit && styles.disabled)}
          onClick={canSubmit ? handleSubmit : undefined}
        >
          <Text className={styles.confirmBtnText}>
            {canSubmit ? '确认锁价预约' : '请填写完整信息'}
          </Text>
        </View>
      </View>

      {showSuccess && (
        <View className={styles.successModal} onClick={handleCloseSuccess}>
          <View className={styles.successCard} onClick={e => e.stopPropagation()}>
            <Text className={styles.successIcon}>🎉</Text>
            <Text className={styles.successTitle}>锁价成功</Text>
            <Text className={styles.successDesc}>
              您已成功锁定套餐价格，在有效期内到店均可享受此价格
            </Text>
            <View className={styles.successInfo}>
              <View className={styles.successInfoItem}>
                <Text className={styles.successInfoLabel}>套餐名称</Text>
                <Text className={styles.successInfoValue}>{pkg.name}</Text>
              </View>
              <View className={styles.successInfoItem}>
                <Text className={styles.successInfoLabel}>锁定价格</Text>
                <Text className={styles.successInfoValue}>¥{formatPrice(pkg.price)}</Text>
              </View>
              <View className={styles.successInfoItem}>
                <Text className={styles.successInfoLabel}>有效期至</Text>
                <Text className={styles.successInfoValue}>{expireDate}</Text>
              </View>
            </View>
            <View className={styles.successBtn} onClick={handleCloseSuccess}>
              <Text className={styles.successBtnText}>我知道了</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ReservationPage;
