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
