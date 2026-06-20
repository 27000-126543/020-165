import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import classnames from 'classnames';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <View className={styles.container}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <View className={styles.stepItem}>
            <View
              className={classnames(
                styles.stepCircle,
                index < currentStep && styles.completed,
                index === currentStep && styles.current
              )}
            >
              {index < currentStep ? (
                <Text className={styles.checkIcon}>✓</Text>
              ) : (
                <Text className={styles.stepNumber}>{index + 1}</Text>
              )}
            </View>
            <Text
              className={classnames(
                styles.stepLabel,
                index <= currentStep && styles.activeLabel
              )}
            >
              {step}
            </Text>
          </View>
          {index < steps.length - 1 && (
            <View
              className={classnames(
                styles.stepLine,
                index < currentStep && styles.lineCompleted
              )}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

export default StepIndicator;
