import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import classnames from 'classnames';

interface TagProps {
  text: string;
  type?: 'primary' | 'success' | 'warning' | 'error' | 'default';
  size?: 'sm' | 'md';
}

const Tag: React.FC<TagProps> = ({ text, type = 'primary', size = 'md' }) => {
  return (
    <View className={classnames(styles.tag, styles[type], styles[size])}>
      <Text className={styles.tagText}>{text}</Text>
    </View>
  );
};

export default Tag;
