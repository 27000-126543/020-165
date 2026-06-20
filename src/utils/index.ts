export const formatPrice = (price: number): string => {
  return price.toLocaleString('zh-CN');
};

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getDemandLabel = (demand: string): string => {
  const map: Record<string, string> = {
    clean: '牙齿清洁',
    fill: '蛀牙修补',
    whiten: '牙齿变白',
    implant: '缺牙修复'
  };
  return map[demand] || demand;
};

export const getStatusText = (status: string): string => {
  const map: Record<string, string> = {
    locked: '已锁价',
    confirmed: '已确认',
    completed: '已完成',
    cancelled: '已取消',
    inapplicable: '不适用待确认',
    reconfirmed: '已重新确认'
  };
  return map[status] || status;
};

export const getStatusColor = (status: string): string => {
  const map: Record<string, string> = {
    locked: '#36BFFA',
    confirmed: '#52C41A',
    completed: '#86909C',
    cancelled: '#C9CDD4',
    inapplicable: '#FF7D00',
    reconfirmed: '#722ED1'
  };
  return map[status] || '#86909C';
};

export const getBudgetMax = (budget: string): number => {
  const map: Record<string, number> = {
    low: 500,
    medium: 2000,
    high: 8000,
    premium: 999999
  };
  return map[budget] || 999999;
};

export const getBudgetMin = (budget: string): number => {
  const map: Record<string, number> = {
    low: 0,
    medium: 500,
    high: 2000,
    premium: 8000
  };
  return map[budget] || 0;
};

export const formatDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

export const getIntentionText = (intention: string): string => {
  const map: Record<string, string> = {
    accept_advice: '接受医生建议',
    see_alternative: '想看替代套餐',
    defer: '暂不处理'
  };
  return map[intention] || intention;
};

export const getIntentionIcon = (intention: string): string => {
  const map: Record<string, string> = {
    accept_advice: '✅',
    see_alternative: '🔍',
    defer: '⏸️'
  };
  return map[intention] || '📝';
};

export const getBudgetLabel = (budget: string): string => {
  const map: Record<string, string> = {
    low: '实惠型(500元以内)',
    medium: '舒适型(500-2000元)',
    high: '品质型(2000-8000元)',
    premium: '高端型(8000元以上)'
  };
  return map[budget] || budget;
};

export const getRemainingDays = (expireDate: string): number => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const expire = new Date(expireDate);
  expire.setHours(0, 0, 0, 0);
  return Math.ceil((expire.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

export const isExpiringSoon = (expireDate: string, threshold: number = 3): boolean => {
  const days = getRemainingDays(expireDate);
  return days >= 0 && days <= threshold;
};

export const isExpired = (expireDate: string): boolean => {
  return getRemainingDays(expireDate) < 0;
};

export const getPainLevelLabel = (pain: string): string => {
  const map: Record<string, string> = {
    none: '没有疼痛',
    mild: '轻微不适',
    moderate: '明显疼痛',
    severe: '剧烈疼痛'
  };
  return map[pain] || pain;
};

export const getAgeGroupLabel = (age: string): string => {
  const map: Record<string, string> = {
    child: '12岁以下',
    teen: '12-18岁',
    adult: '18-60岁',
    senior: '60岁以上'
  };
  return map[age] || age;
};

export const getXrayLabel = (hasXRay: boolean | null): string => {
  if (hasXRay === null) return '未选择';
  return hasXRay ? '已拍过X光片' : '没有拍过';
};
