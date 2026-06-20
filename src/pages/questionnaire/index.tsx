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
import { DentalPackage, RecommendResult } from '@/types';
import classnames from 'classnames';

const steps = ['选择诉求', '年龄段', '拍片情况', '疼痛程度', '预算范围'];

const QuestionnairePage: React.FC = () => {
  const { questionnaireData, updateQuestionnaire } = useAppContext();
  const [currentStep, setCurrentStep] = useState(0);

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
      return {
        packages: [],
        budgetMatch: 'none'
      };
    }
    return getRecommendedPackages(questionnaireData.demand, questionnaireData.budget);
  }, [currentStep, questionnaireData]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 5) {
      setCurrentStep(0);
      return;
    }
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      Taro.navigateBack();
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
    return (
      <View className={styles.page}>
        <ScrollView scrollY>
          <View className={styles.stepContainer}>
            <StepIndicator steps={steps} currentStep={5} />
          </View>

          <View className={styles.content}>
            <View className={styles.resultCard}>
              <Text className={styles.resultIcon}>
                {recommendResult.budgetMatch === 'perfect' ? '🎉' : recommendResult.budgetMatch === 'partial' ? '💡' : '😅'}
              </Text>
              <Text className={styles.resultTitle}>
                {recommendResult.budgetMatch === 'perfect'
                  ? '已为您找到合适方案'
                  : recommendResult.budgetMatch === 'partial'
                  ? '预算略有差异，为您推荐相近选项'
                  : '暂无完全匹配的套餐'}
              </Text>
              <Text className={styles.resultDesc}>
                {recommendResult.budgetMatch === 'perfect'
                  ? '根据您的需求，我们为您推荐以下套餐'
                  : recommendResult.budgetMatch === 'partial'
                  ? '以下套餐价格接近您的预算，供您参考'
                  : '您可以参考以下建议，或查看全部套餐'}
              </Text>

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

              <View className={styles.resultTip}>
                <Text className={styles.resultTipText}>
                  � 温馨提示：套餐仅供参考，具体治疗方案请以医生面诊为准
                </Text>
              </View>
            </View>

            {recommendResult.packages.length > 0 ? (
              <View className={styles.packageSection}>
                <Text className={styles.sectionTitle}>
                  {recommendResult.budgetMatch === 'none' ? '您可能感兴趣' : '推荐套餐'}
                </Text>
                {recommendResult.packages.map(pkg => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </View>
            ) : (
              <View className={styles.emptyState}>
                <Text className={styles.emptyIcon}>🦷</Text>
                <Text className={styles.emptyText}>暂无完全匹配的套餐</Text>
                <Text className={styles.emptyDesc}>
                  建议您到店先做口腔检查，让医生根据具体情况给出方案
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        <View className={styles.bottomBar}>
          <View className={styles.backBtn} onClick={handleBack}>
            <Text className={styles.backBtnText}>重新选择</Text>
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
