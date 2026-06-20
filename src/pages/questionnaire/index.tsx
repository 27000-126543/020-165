import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { useAppContext } from '@/store/app-context';
import {
  demandOptions,
  ageGroupOptions,
  xrayOptions,
  painLevelOptions,
  budgetOptions
} from '@/data/questionnaire';
import { getRecommendedPackages } from '@/data/packages';
import StepIndicator from '@/components/StepIndicator';
import PackageCard from '@/components/PackageCard';
import Tag from '@/components/Tag';
import { DentalPackage, RecommendResult, BudgetRange } from '@/types';
import { getBudgetLabel, formatPrice } from '@/utils';
import classnames from 'classnames';

const steps = ['选择诉求', '年龄段', '拍片情况', '疼痛程度', '预算范围'];

const intentionOptions = [
  { value: 'low' as BudgetRange, label: '实惠型', sub: '500元以内' },
  { value: 'medium' as BudgetRange, label: '舒适型', sub: '500-2000元' },
  { value: 'high' as BudgetRange, label: '品质型', sub: '2000-8000元' },
  { value: 'premium' as BudgetRange, label: '高端型', sub: '8000元以上' }
];

const matchLabelMap = {
  perfect: { label: '完全匹配', type: 'success' as const, icon: '✅' },
  sufficient: { label: '预算充足', type: 'success' as const, icon: '💎' },
  partial: { label: '预算略超', type: 'warning' as const, icon: '💡' },
  none: { label: '暂无匹配', type: 'error' as const, icon: '😅' }
};

const QuestionnairePage: React.FC = () => {
  const { questionnaireData, updateQuestionnaire } = useAppContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const canNext = useMemo(() => {
    switch (currentStep) {
      case 0:
        return questionnaireData.demand !== null;
      case 1:
        return questionnaireData.ageGroup !== null;
      case 2:
        return questionnaireData.hasXRay !== null;
      case 3:
        return questionnaireData.painLevel !== null;
      case 4:
        return questionnaireData.budget !== null;
      default:
        return false;
    }
  }, [currentStep, questionnaireData]);

  const recommendResult = useMemo<RecommendResult>(() => {
    if (currentStep < 5) {
      return { packages: [], budgetMatch: 'none' };
    }
    return getRecommendedPackages(
      questionnaireData.demand,
      questionnaireData.budget,
      questionnaireData.painLevel,
      questionnaireData.hasXRay
    );
  }, [currentStep, questionnaireData]);

  const comparePackages = useMemo(() => {
    return recommendResult.packages.filter(pkg => compareIds.includes(pkg.id));
  }, [recommendResult, compareIds]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === 4 && canNext) {
      setCurrentStep(5);
    }
  };

  const handleBack = () => {
    if (currentStep === 5) {
      setCurrentStep(4);
      setCompareIds([]);
      setShowCompare(false);
      return;
    }
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      Taro.navigateBack();
    }
  };

  const handleChangeBudget = (budget: BudgetRange) => {
    updateQuestionnaire({ budget });
    setCompareIds([]);
    setShowCompare(false);
    Taro.showToast({ title: '已重新推荐', icon: 'success' });
  };

  const toggleCompare = (id: string) => {
    setCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(pid => pid !== id);
      }
      if (prev.length >= 3) {
        Taro.showToast({ title: '最多选3个对比', icon: 'none' });
        return prev;
      }
      return [...prev, id];
    });
  };

  const clearCompare = () => {
    setCompareIds([]);
    setShowCompare(false);
  };

  const getResultTitle = () => {
    switch (recommendResult.budgetMatch) {
      case 'perfect':
        return '已为您找到合适方案';
      case 'sufficient':
        return '您的预算非常充裕';
      case 'partial':
        return '预算略有差异，为您推荐相近选项';
      case 'none':
        return '暂无完全匹配的套餐';
      default:
        return '';
    }
  };

  const getResultDesc = () => {
    switch (recommendResult.budgetMatch) {
      case 'perfect':
        return '根据您的需求和预算，我们为您推荐以下套餐';
      case 'sufficient':
        return '以下所有方案都在预算范围内，您可以根据个人偏好选择更高配置';
      case 'partial':
        return '以下套餐价格接近您的预算，供您参考对比';
      case 'none':
        return '您可以调整预算或查看其他建议方案';
      default:
        return '';
    }
  };

  const getCompareHighlight = (field: string, value: number | string) => {
    if (comparePackages.length < 2) return '';
    const values = comparePackages.map(pkg => {
      switch (field) {
        case 'price':
          return pkg.price;
        case 'followUpCount':
          return pkg.followUpCount;
        case 'extraItems':
          return pkg.extraItems.length;
        default:
          return 0;
      }
    });
    const minVal = Math.min(...values);
    switch (field) {
      case 'price':
        return value === minVal ? '更省钱' : '';
      case 'followUpCount':
        return value === minVal ? '更少复诊' : '';
      case 'extraItems':
        return value === minVal ? '另收风险更少' : '';
      default:
        return '';
    }
  };

  const renderOptions = () => {
    switch (currentStep) {
      case 0:
        return demandOptions.map(option => (
          <View
            key={option.value}
            className={classnames(
              styles.optionCard,
              questionnaireData.demand === option.value && styles.selected
            )}
            onClick={() => updateQuestionnaire({ demand: option.value })}
          >
            <Text className={styles.optionIcon}>{option.icon}</Text>
            <View className={styles.optionContent}>
              <Text className={styles.optionTitle}>{option.label}</Text>
              <Text className={styles.optionDesc}>{option.description}</Text>
            </View>
            <View className={styles.optionCheck}>
              {questionnaireData.demand === option.value && (
                <Text className={styles.checkIcon}>✓</Text>
              )}
            </View>
          </View>
        ));
      case 1:
        return ageGroupOptions.map(option => (
          <View
            key={option.value}
            className={classnames(
              styles.optionCard,
              questionnaireData.ageGroup === option.value && styles.selected
            )}
            onClick={() => updateQuestionnaire({ ageGroup: option.value })}
          >
            <View className={styles.optionContent}>
              <Text className={styles.optionTitle}>{option.label}</Text>
              <Text className={styles.optionDesc}>{option.description}</Text>
            </View>
            <View className={styles.optionCheck}>
              {questionnaireData.ageGroup === option.value && (
                <Text className={styles.checkIcon}>✓</Text>
              )}
            </View>
          </View>
        ));
      case 2:
        return xrayOptions.map(option => (
          <View
            key={String(option.value)}
            className={classnames(
              styles.optionCard,
              questionnaireData.hasXRay === option.value && styles.selected
            )}
            onClick={() => updateQuestionnaire({ hasXRay: option.value })}
          >
            <Text className={styles.optionIcon}>{option.value ? '📷' : '❓'}</Text>
            <View className={styles.optionContent}>
              <Text className={styles.optionTitle}>{option.label}</Text>
              <Text className={styles.optionDesc}>{option.description}</Text>
            </View>
            <View className={styles.optionCheck}>
              {questionnaireData.hasXRay === option.value && (
                <Text className={styles.checkIcon}>✓</Text>
              )}
            </View>
          </View>
        ));
      case 3:
        return painLevelOptions.map(option => (
          <View
            key={option.value}
            className={classnames(
              styles.optionCard,
              questionnaireData.painLevel === option.value && styles.selected
            )}
            onClick={() => updateQuestionnaire({ painLevel: option.value })}
          >
            <Text className={styles.optionIcon}>{option.icon}</Text>
            <View className={styles.optionContent}>
              <Text className={styles.optionTitle}>{option.label}</Text>
              <Text className={styles.optionDesc}>{option.description}</Text>
            </View>
            <View className={styles.optionCheck}>
              {questionnaireData.painLevel === option.value && (
                <Text className={styles.checkIcon}>✓</Text>
              )}
            </View>
          </View>
        ));
      case 4:
        return budgetOptions.map(option => (
          <View
            key={option.value}
            className={classnames(
              styles.optionCard,
              questionnaireData.budget === option.value && styles.selected
            )}
            onClick={() => updateQuestionnaire({ budget: option.value })}
          >
            <View className={styles.optionContent}>
              <Text className={styles.optionTitle}>{option.label}</Text>
              <Text className={styles.optionDesc}>{option.range}</Text>
            </View>
            <View className={styles.optionCheck}>
              {questionnaireData.budget === option.value && (
                <Text className={styles.checkIcon}>✓</Text>
              )}
            </View>
          </View>
        ));
      default:
        return null;
    }
  };

  const questionTitles = [
    '你想解决什么问题？',
    '请问你的年龄段是？',
    '最近拍过口腔X光片吗？',
    '现在疼痛程度如何？',
    '你的预算范围是？'
  ];

  const questionDescs = [
    '选择最符合你需求的一项',
    '帮你推荐更适合的方案',
    '了解是否需要安排拍片',
    '方便医生评估病情',
    '帮你找到性价比最高的套餐'
  ];

  if (currentStep === 5) {
    const matchInfo = matchLabelMap[recommendResult.budgetMatch];
    return (
      <View className={styles.page}>
        <ScrollView scrollY>
          <View className={styles.stepContainer}>
            <StepIndicator steps={steps} currentStep={5} />
          </View>

          <View className={styles.content}>
            <View
              className={classnames(
                styles.resultCard,
                styles[`result-${recommendResult.budgetMatch}`]
              )}
            >
              <View className={styles.resultHeader}>
                <Text className={styles.resultIcon}>{matchInfo.icon}</Text>
                <Tag text={matchInfo.label} type={matchInfo.type} size="md" />
              </View>
              <Text className={styles.resultTitle}>{getResultTitle()}</Text>
              <Text className={styles.resultDesc}>{getResultDesc()}</Text>

              <View className={styles.currentBudget}>
                <Text className={styles.currentBudgetLabel}>当前预算：</Text>
                <Text className={styles.currentBudgetValue}>
                  {questionnaireData.budget ? getBudgetLabel(questionnaireData.budget) : '未选择'}
                </Text>
              </View>

              <View className={styles.budgetQuickChange}>
                <Text className={styles.quickChangeLabel}>调整预算重新推荐：</Text>
                <View className={styles.budgetChips}>
                  {intentionOptions.map(opt => (
                    <View
                      key={opt.value}
                      className={classnames(
                        styles.budgetChip,
                        questionnaireData.budget === opt.value && styles.budgetChipActive
                      )}
                      onClick={() => handleChangeBudget(opt.value)}
                    >
                      <Text className={styles.budgetChipText}>{opt.label}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {recommendResult.budgetTip && (
                <View className={styles.budgetWarning}>
                  <Text className={styles.budgetWarningText}>
                    ⚠️ {recommendResult.budgetTip}
                  </Text>
                </View>
              )}

              {recommendResult.alternativeTip && (
                <View className={styles.alternativeTip}>
                  <Text className={styles.alternativeTipText}>
                    💡 {recommendResult.alternativeTip}
                  </Text>
                </View>
              )}
            </View>

            {recommendResult.explanation && (
              <View className={styles.explanationCard}>
                <Text className={styles.explanationTitle}>为什么推荐给我</Text>
                <View className={styles.explanationItem}>
                  <Text className={styles.explanationLabel}>诉求影响</Text>
                  <Text className={styles.explanationText}>{recommendResult.explanation.demandReason}</Text>
                </View>
                <View className={styles.explanationItem}>
                  <Text className={styles.explanationLabel}>预算影响</Text>
                  <Text className={styles.explanationText}>{recommendResult.explanation.budgetReason}</Text>
                </View>
                {recommendResult.explanation.painReason && (
                  <View className={styles.explanationItem}>
                    <Text className={styles.explanationLabel}>疼痛影响</Text>
                    <Text className={styles.explanationText}>{recommendResult.explanation.painReason}</Text>
                  </View>
                )}
                {recommendResult.explanation.xrayReason && (
                  <View className={styles.explanationItem}>
                    <Text className={styles.explanationLabel}>拍片影响</Text>
                    <Text className={styles.explanationText}>{recommendResult.explanation.xrayReason}</Text>
                  </View>
                )}
                <View className={styles.explanationSummary}>
                  <Text className={styles.explanationSummaryText}>{recommendResult.explanation.summary}</Text>
                </View>
              </View>
            )}

            {showCompare && comparePackages.length >= 2 && (
              <View className={styles.compareSection}>
                <View className={styles.compareHeader}>
                  <Text className={styles.sectionTitle}>套餐对比（{comparePackages.length}个）</Text>
                  <View className={styles.compareHeaderActions}>
                    <Text
                      className={styles.clearCompare}
                      onClick={clearCompare}
                    >
                      清空对比
                    </Text>
                    <Text
                      className={styles.closeCompare}
                      onClick={() => setShowCompare(false)}
                    >
                      收起 ×
                    </Text>
                  </View>
                </View>
                {compareIds.length >= 3 && (
                  <View className={styles.compareReplaceTip}>
                    <Text className={styles.compareReplaceTipText}>已选3个，点击已选项可取消后再选其他套餐替换</Text>
                  </View>
                )}
                <ScrollView scrollX className={styles.compareScroll}>
                  <View className={styles.compareTable}>
                    <View className={styles.compareRowHeader}>
                      <View className={styles.compareCellLabel}>
                        <Text className={styles.compareCellText}>对比项</Text>
                      </View>
                      {comparePackages.map(pkg => (
                        <View key={pkg.id} className={styles.compareCellHeader}>
                          <Text className={styles.compareCellText}>{pkg.name}</Text>
                        </View>
                      ))}
                    </View>

                    <View className={styles.compareRow}>
                      <View className={styles.compareCellLabel}>
                        <Text className={styles.compareCellText}>套餐价格</Text>
                      </View>
                      {comparePackages.map(pkg => {
                        const highlight = getCompareHighlight('price', pkg.price);
                        return (
                          <View key={pkg.id} className={styles.compareCell}>
                            <Text className={styles.comparePrice}>¥{formatPrice(pkg.price)}</Text>
                            <Text className={styles.compareOriginal}>¥{formatPrice(pkg.originalPrice)}</Text>
                            {highlight && (
                              <Text className={styles.compareHighlight}>{highlight}</Text>
                            )}
                          </View>
                        );
                      })}
                    </View>

                    <View className={styles.compareRow}>
                      <View className={styles.compareCellLabel}>
                        <Text className={styles.compareCellText}>诊所</Text>
                      </View>
                      {comparePackages.map(pkg => (
                        <View key={pkg.id} className={styles.compareCell}>
                          <Text className={styles.compareCellText}>{pkg.clinicName}</Text>
                        </View>
                      ))}
                    </View>

                    <View className={styles.compareRow}>
                      <View className={styles.compareCellLabel}>
                        <Text className={styles.compareCellText}>评分</Text>
                      </View>
                      {comparePackages.map(pkg => (
                        <View key={pkg.id} className={styles.compareCell}>
                          <Text className={styles.compareCellText}>★ {pkg.rating}</Text>
                        </View>
                      ))}
                    </View>

                    <View className={styles.compareRow}>
                      <View className={styles.compareCellLabel}>
                        <Text className={styles.compareCellText}>包含项目</Text>
                      </View>
                      {comparePackages.map(pkg => (
                        <View key={pkg.id} className={styles.compareCell}>
                          {pkg.includes.slice(0, 3).map((item, idx) => (
                            <Text key={idx} className={styles.compareItemText}>
                              • {item.name}
                            </Text>
                          ))}
                          {pkg.includes.length > 3 && (
                            <Text className={styles.compareMore}>等{pkg.includes.length}项</Text>
                          )}
                        </View>
                      ))}
                    </View>

                    <View className={styles.compareRow}>
                      <View className={styles.compareCellLabel}>
                        <Text className={styles.compareCellText}>复诊次数</Text>
                      </View>
                      {comparePackages.map(pkg => {
                        const highlight = getCompareHighlight('followUpCount', pkg.followUpCount);
                        return (
                          <View key={pkg.id} className={styles.compareCell}>
                            <Text className={styles.compareCellText}>{pkg.followUpCount}次</Text>
                            {highlight && (
                              <Text className={styles.compareHighlight}>{highlight}</Text>
                            )}
                          </View>
                        );
                      })}
                    </View>

                    <View className={styles.compareRow}>
                      <View className={styles.compareCellLabel}>
                        <Text className={styles.compareCellText}>另收项目</Text>
                      </View>
                      {comparePackages.map(pkg => {
                        const highlight = getCompareHighlight('extraItems', pkg.extraItems.length);
                        return (
                          <View key={pkg.id} className={styles.compareCell}>
                            {pkg.extraItems.length > 0 ? (
                              pkg.extraItems.slice(0, 2).map((item, idx) => (
                                <Text key={idx} className={styles.compareExtraText}>
                                  • {item.name} ({item.priceRange})
                                </Text>
                              ))
                            ) : (
                              <Text className={styles.compareCellText}>无</Text>
                            )}
                            {highlight && (
                              <Text className={styles.compareHighlight}>{highlight}</Text>
                            )}
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </ScrollView>
              </View>
            )}

            {recommendResult.packages.length > 0 ? (
              <View className={styles.packageSection}>
                <View className={styles.sectionHeader}>
                  <Text className={styles.sectionTitle}>
                    {recommendResult.budgetMatch === 'none' ? '您可能感兴趣' : '推荐套餐'}
                  </Text>
                  {compareIds.length > 0 && (
                    <Text
                      className={styles.compareBtn}
                      onClick={() =>
                        compareIds.length >= 2
                          ? setShowCompare(true)
                          : Taro.showToast({ title: '至少选2个对比', icon: 'none' })
                      }
                    >
                      {showCompare ? '已对比' : `对比(${compareIds.length}/3)`}
                    </Text>
                  )}
                </View>
                <Text className={styles.sectionHint}>
                  点击套餐卡片右上角可选择对比（最多3个）
                </Text>
                {recommendResult.packages.map(pkg => (
                  <View key={pkg.id} className={styles.packageWithCompare}>
                    <PackageCard pkg={pkg} />
                    <View
                      className={classnames(
                        styles.compareCheckbox,
                        compareIds.includes(pkg.id) && styles.compareChecked
                      )}
                      onClick={() => toggleCompare(pkg.id)}
                    >
                      <Text className={styles.compareCheckboxText}>
                        {compareIds.includes(pkg.id) ? '✓' : '对比'}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View className={styles.emptyState}>
                <Text className={styles.emptyIcon}>🦷</Text>
                <Text className={styles.emptyText}>暂无完全匹配的套餐</Text>
                <Text className={styles.emptyDesc}>
                  建议您调整预算范围，或到店先做口腔检查，让医生根据具体情况给出方案
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        <View className={styles.bottomBar}>
          <View className={styles.backBtn} onClick={handleBack}>
            <Text className={styles.backBtnText}>修改预算</Text>
          </View>
          <View
            className={styles.nextBtn}
            onClick={() => Taro.switchTab({ url: '/pages/packages/index' })}
          >
            <Text className={styles.nextBtnText}>查看全部套餐</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.page}>
      <View className={styles.stepContainer}>
        <StepIndicator steps={steps} currentStep={currentStep} />
      </View>

      <ScrollView className={styles.content} scrollY>
        <View className={styles.questionCard}>
          <Text className={styles.questionTitle}>{questionTitles[currentStep]}</Text>
          <Text className={styles.questionDesc}>{questionDescs[currentStep]}</Text>
          <View className={styles.optionsList}>{renderOptions()}</View>
        </View>
      </ScrollView>

      <View className={styles.bottomBar}>
        <View className={styles.backBtn} onClick={handleBack}>
          <Text className={styles.backBtnText}>上一步</Text>
        </View>
        <View
          className={classnames(styles.nextBtn, !canNext && styles.disabled)}
          onClick={canNext ? handleNext : undefined}
        >
          <Text className={styles.nextBtnText}>
            {currentStep === 4 ? '查看推荐' : '下一步'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default QuestionnairePage;
