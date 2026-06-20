import React, { useState, useEffect } from 'react';
import { View, Text, Textarea } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import styles from './index.module.scss';
import { useAppContext } from '@/store/app-context';
import { getPackageById, getPackagesByCategory } from '@/data/packages';
import { getStatusText, getStatusColor, formatPrice, formatDateTime, getIntentionText, getIntentionIcon, getRemainingDays, isExpiringSoon, isExpired, getDemandLabel } from '@/utils';
import { ReservationRecord, DentalPackage, HandleIntention, DemandType } from '@/types';
import classnames from 'classnames';

const intentionOptions: { value: HandleIntention; label: string; icon: string; desc: string }[] = [
  { value: 'accept_advice', label: '接受医生建议', icon: '✅', desc: '遵循医生给出的方案调整' },
  { value: 'see_alternative', label: '想看替代套餐', icon: '🔍', desc: '希望了解其他可选方案' },
  { value: 'defer', label: '暂不处理', icon: '⏸️', desc: '先考虑，后续再决定' }
];

const ReservationDetailPage: React.FC = () => {
  const router = useRouter();
  const { getReservationById, markInapplicable, addCommunication } = useAppContext();
  const [reservation, setReservation] = useState<ReservationRecord | null>(null);
  const [pkg, setPkg] = useState<DentalPackage | null>(null);
  const [patientInput, setPatientInput] = useState('');
  const [selectedIntention, setSelectedIntention] = useState<HandleIntention | null>(null);
  const [showInapplicableModal, setShowInapplicableModal] = useState(false);
  const [inapplicableReason, setInapplicableReason] = useState('');

  useEffect(() => {
    const id = router.params.id;
    if (id) {
      const found = getReservationById(id as string);
      if (found) {
        setReservation(found);
        const packageInfo = getPackageById(found.packageId);
        if (packageInfo) {
          setPkg(packageInfo);
        }
      }
    }
  }, [router.params.id]);

  useEffect(() => {
    const id = router.params.id;
    if (id) {
      const interval = setInterval(() => {
        const found = getReservationById(id as string);
        if (found) {
          setReservation(found);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [router.params.id, getReservationById]);

  const handleMarkInapplicable = () => {
    if (!inapplicableReason.trim()) {
      Taro.showToast({ title: '请填写不适用原因', icon: 'none' });
      return;
    }
    if (reservation) {
      markInapplicable(reservation.id, inapplicableReason);
      setShowInapplicableModal(false);
      setInapplicableReason('');
      Taro.showToast({ title: '已标记不适用', icon: 'success' });
    }
  };

  const handleConfirm = () => {
    if (!selectedIntention && !patientInput.trim()) {
      Taro.showToast({ title: '请选择处理意向或填写意见', icon: 'none' });
      return;
    }
    if (reservation) {
      const content = patientInput.trim() || getIntentionText(selectedIntention || '');
      const confirmedAt = selectedIntention === 'accept_advice' ? formatDateTime(new Date()) : undefined;
      addCommunication(reservation.id, content, 'patient', selectedIntention || undefined, confirmedAt);
      setPatientInput('');
      setSelectedIntention(null);
      Taro.showToast({ title: '提交成功', icon: 'success' });
    }
  };

  if (!reservation) {
    return (
      <View className={styles.page}>
        <Text>加载中...</Text>
      </View>
    );
  }

  const canMarkInapplicable = reservation.status === 'locked' || reservation.status === 'confirmed';
  const needReconfirm = reservation.status === 'inapplicable';
  const statusColor = getStatusColor(reservation.status);

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <Text className={styles.packageName}>{reservation.packageName}</Text>
        <Text className={styles.clinicName}>{reservation.clinicName}</Text>
        <View className={styles.statusRow}>
          <View className={styles.statusTag} style={{ backgroundColor: `${statusColor}40` }}>
            <Text style={{ color: statusColor }}>{getStatusText(reservation.status)}</Text>
          </View>
          {reservation.lastIntention && (
            <View className={styles.intentionTag}>
              <Text className={styles.intentionTagIcon}>{getIntentionIcon(reservation.lastIntention)}</Text>
              <Text className={styles.intentionTagText}>{getIntentionText(reservation.lastIntention)}</Text>
            </View>
          )}
        </View>
        <View className={styles.priceRow}>
          <Text className={styles.priceSymbol}>¥</Text>
          <Text className={styles.price}>{formatPrice(reservation.price)}</Text>
          <Text className={styles.priceLabel}> 锁定价格</Text>
        </View>
        {(() => {
          const days = getRemainingDays(reservation.expireDate);
          if (days < 0) {
            return (
              <View className={styles.expireWarningRow}>
                <Text className={styles.expireTagExpired}>🔴 已过期</Text>
              </View>
            );
          }
          if (days <= 3) {
            return (
              <View className={styles.expireWarningRow}>
                <Text className={styles.expireTagWarning}>⚠️ 即将过期，仅剩{days}天</Text>
              </View>
            );
          }
          return (
            <View className={styles.expireWarningRow}>
              <Text className={styles.expireTagNormal}>有效期还剩{days}天</Text>
            </View>
          );
        })()}
      </View>

      <View className={styles.content}>
        {needReconfirm && reservation.inapplicableReason && (
          <View className={styles.inapplicableBanner}>
            <Text className={styles.bannerTitle}>
              <Text className={styles.bannerIcon}>⚠️</Text>
              医生判断不适用
            </Text>
            <Text className={styles.bannerContent}>
              医生检查后认为此套餐不适用您的情况，请查看原因后重新确认
            </Text>
            <View className={styles.bannerReason}>
              <Text>原因：{reservation.inapplicableReason}</Text>
            </View>
          </View>
        )}

        {needReconfirm && reservation.lastIntention === 'see_alternative' && (() => {
          const currentPkg = getPackageById(reservation.packageId);
          if (!currentPkg) return null;
          const alternatives = getPackagesByCategory(currentPkg.category as DemandType)
            .filter(p => p.id !== reservation.packageId)
            .slice(0, 2);
          if (alternatives.length === 0) return null;
          return (
            <View className={styles.section}>
              <Text className={styles.sectionTitle}>
                <Text className={styles.sectionIcon}>🔍</Text>
                替代套餐推荐
              </Text>
              {alternatives.map(alt => (
                <View
                  key={alt.id}
                  className={styles.alternativeCard}
                  onClick={() => Taro.navigateTo({ url: `/pages/package-detail/index?id=${alt.id}` })}
                >
                  <View className={styles.alternativeInfo}>
                    <Text className={styles.alternativeName}>{alt.name}</Text>
                    <View className={styles.alternativeMeta}>
                      <Text className={styles.alternativePrice}>¥{formatPrice(alt.price)}</Text>
                      <Text className={styles.alternativeRating}>⭐ {alt.rating}</Text>
                    </View>
                  </View>
                  <View className={styles.alternativeBtn}>
                    <Text className={styles.alternativeBtnText}>查看详情</Text>
                  </View>
                </View>
              ))}
            </View>
          );
        })()}

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionIcon}>📋</Text>
            预约信息
          </Text>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>套餐名称</Text>
            <Text className={styles.infoValue}>{reservation.packageName}</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>所属诊所</Text>
            <Text className={styles.infoValue}>{reservation.clinicName}</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>锁定价格</Text>
            <Text className={styles.infoValue}>¥{formatPrice(reservation.price)}</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>锁价日期</Text>
            <Text className={styles.infoValue}>{reservation.lockDate}</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>有效期至</Text>
            <Text className={styles.infoValue}>{reservation.expireDate}</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>剩余天数</Text>
            {(() => {
              const days = getRemainingDays(reservation.expireDate);
              if (days < 0) {
                return <Text className={classnames(styles.infoValue, styles.textExpired)}>已过期{-days}天</Text>;
              }
              if (days <= 3) {
                return <Text className={classnames(styles.infoValue, styles.textWarning)}>仅剩{days}天</Text>;
              }
              return <Text className={styles.infoValue}>{days}天</Text>;
            })()}
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>创建时间</Text>
            <Text className={styles.infoValue}>{reservation.createTime}</Text>
          </View>
        </View>

        {pkg && (
          <View className={styles.section}>
            <Text className={styles.sectionTitle}>
              <Text className={styles.sectionIcon}>📦</Text>
              套餐包含
            </Text>
            {pkg.includes.slice(0, 4).map((item, index) => (
              <View key={index} className={styles.infoRow}>
                <Text className={styles.infoLabel}>{item.name}</Text>
                <Text className={styles.infoValue}>
                  {item.description} ×{item.count}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionIcon}>💬</Text>
            沟通记录
          </Text>
          {reservation.communications.length > 0 ? (
            <View className={styles.commList}>
              {reservation.communications.map(comm => (
                <View
                  key={comm.id}
                  className={classnames(styles.commItem, styles[comm.type])}
                >
                  <View className={styles.commAvatar}>
                    <Text>{comm.type === 'doctor' ? '👨‍⚕️' : '😊'}</Text>
                  </View>
                  <View className={styles.commContent}>
                    <View className={styles.commHeader}>
                      <Text className={styles.commType}>
                        {comm.type === 'doctor' ? '医生' : '我'}
                      </Text>
                      {comm.intention && (
                        <View className={styles.commIntention}>
                          <Text className={styles.commIntentionIcon}>
                            {getIntentionIcon(comm.intention)}
                          </Text>
                          <Text className={styles.commIntentionText}>
                            {getIntentionText(comm.intention)}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text className={styles.commText}>{comm.content}</Text>
                    <View className={styles.commTimeRow}>
                      <Text className={styles.commTime}>{comm.time}</Text>
                      {comm.confirmedAt && (
                        <Text className={styles.commConfirmedAt}>确认时间: {comm.confirmedAt}</Text>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className={styles.emptyComm}>
              <Text className={styles.emptyCommText}>暂无沟通记录</Text>
            </View>
          )}
        </View>

        {needReconfirm && (
          <View className={styles.inputSection}>
            <Text className={styles.inputTitle}>我的确认</Text>
            <Text className={styles.inputTip}>
              请选择处理意向，或填写您的意见
            </Text>

            <View className={styles.intentionSection}>
              <Text className={styles.intentionSectionTitle}>处理意向：</Text>
              <View className={styles.intentionList}>
                {intentionOptions.map(opt => (
                  <View
                    key={opt.value}
                    className={classnames(
                      styles.intentionCard,
                      selectedIntention === opt.value && styles.intentionCardSelected
                    )}
                    onClick={() => setSelectedIntention(opt.value)}
                  >
                    <View className={styles.intentionCardIconWrap}>
                      <Text className={styles.intentionCardIcon}>{opt.icon}</Text>
                    </View>
                    <Text className={styles.intentionCardLabel}>{opt.label}</Text>
                    <Text className={styles.intentionCardDesc}>{opt.desc}</Text>
                    {selectedIntention === opt.value && (
                      <View className={styles.intentionCardCheck}>✓</View>
                    )}
                  </View>
                ))}
              </View>
            </View>

            <View className={styles.inputBox}>
              <Textarea
                className={styles.textarea}
                placeholder="补充说明（可选），如：希望了解具体哪些替代方案、或者对医生建议的疑问等"
                value={patientInput}
                onInput={e => setPatientInput(e.detail.value)}
                maxlength={500}
                autoHeight
              />
            </View>
          </View>
        )}
      </View>

      <View className={styles.bottomBar}>
        {canMarkInapplicable && (
          <View className={styles.actionRow}>
            <View className={styles.secondaryBtn} onClick={() => Taro.navigateBack()}>
              <Text className={styles.secondaryBtnText}>返回</Text>
            </View>
            <View
              className={styles.warningBtn}
              onClick={() => setShowInapplicableModal(true)}
            >
              <Text className={styles.warningBtnText}>到店不适用</Text>
            </View>
          </View>
        )}

        {needReconfirm && (
          <View className={styles.actionRow}>
            <View className={styles.secondaryBtn} onClick={() => Taro.navigateBack()}>
              <Text className={styles.secondaryBtnText}>返回</Text>
            </View>
            <View
              className={classnames(
                styles.primaryBtn,
                !selectedIntention && !patientInput.trim() && styles.disabled
              )}
              onClick={selectedIntention || patientInput.trim() ? handleConfirm : undefined}
            >
              <Text className={styles.primaryBtnText}>确认提交</Text>
            </View>
          </View>
        )}

        {!canMarkInapplicable && !needReconfirm && (
          <View className={styles.primaryBtn} onClick={() => Taro.navigateBack()}>
            <Text className={styles.primaryBtnText}>返回</Text>
          </View>
        )}
      </View>

      {showInapplicableModal && (
        <View className={styles.modal} onClick={() => setShowInapplicableModal(false)}>
          <View className={styles.modalCard} onClick={e => e.stopPropagation()}>
            <Text className={styles.modalTitle}>套餐不适用</Text>
            <Text className={styles.modalDesc}>
              请填写医生判断套餐不适用的原因，此记录将保存供患者查看和确认
            </Text>
            <View className={styles.modalInput}>
              <Textarea
                className={styles.modalTextarea}
                placeholder="请输入不适用原因，如：患者口腔条件不适合该方案、需要增加其他治疗项目等"
                value={inapplicableReason}
                onInput={e => setInapplicableReason(e.detail.value)}
                maxlength={500}
                autoHeight
              />
            </View>
            <View className={styles.modalBtnRow}>
              <View
                className={styles.secondaryBtn}
                onClick={() => setShowInapplicableModal(false)}
              >
                <Text className={styles.secondaryBtnText}>取消</Text>
              </View>
              <View
                className={classnames(styles.warningBtn, !inapplicableReason.trim() && 'disabled')}
                onClick={inapplicableReason.trim() ? handleMarkInapplicable : undefined}
              >
                <Text className={styles.warningBtnText}>确认提交</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ReservationDetailPage;
