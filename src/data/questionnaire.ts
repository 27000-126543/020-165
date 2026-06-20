import { DemandType, AgeGroup, PainLevel, BudgetRange } from '@/types';

export const demandOptions: { value: DemandType; label: string; icon: string; description: string }[] = [
  { value: 'clean', label: '牙齿清洁', icon: '🧹', description: '洗牙、洁牙、去除牙结石' },
  { value: 'fill', label: '蛀牙修补', icon: '🦷', description: '补牙、龋齿修复' },
  { value: 'whiten', label: '牙齿变白', icon: '✨', description: '美白、去黄去渍' },
  { value: 'implant', label: '缺牙修复', icon: '🔧', description: '种植牙、镶牙' }
];

export const ageGroupOptions: { value: AgeGroup; label: string; description: string }[] = [
  { value: 'child', label: '12岁以下', description: '儿童口腔护理' },
  { value: 'teen', label: '12-18岁', description: '青少年口腔护理' },
  { value: 'adult', label: '18-60岁', description: '成年人口腔护理' },
  { value: 'senior', label: '60岁以上', description: '中老年人口腔护理' }
];

export const xrayOptions: { value: boolean; label: string; description: string }[] = [
  { value: true, label: '已拍片', description: '3个月内拍过口腔X光片' },
  { value: false, label: '没拍过', description: '需要拍片检查' }
];

export const painLevelOptions: { value: PainLevel; label: string; icon: string; description: string }[] = [
  { value: 'none', label: '不疼', icon: '😊', description: '没有疼痛感,只是常规检查' },
  { value: 'mild', label: '轻微', icon: '🙂', description: '偶尔敏感,不影响吃饭' },
  { value: 'moderate', label: '中等', icon: '😐', description: '吃东西会疼,需要注意' },
  { value: 'severe', label: '严重', icon: '😣', description: '经常疼,影响日常生活' }
];

export const budgetOptions: { value: BudgetRange; label: string; range: string }[] = [
  { value: 'low', label: '实惠型', range: '500元以内' },
  { value: 'medium', label: '舒适型', range: '500-2000元' },
  { value: 'high', label: '品质型', range: '2000-8000元' },
  { value: 'premium', label: '高端型', range: '8000元以上' }
];
