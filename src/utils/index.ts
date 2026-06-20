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
    cancelled: '已取消'
  };
  return map[status] || status;
};

export const getStatusColor = (status: string): string => {
  const map: Record<string, string> = {
    locked: '#36BFFA',
    confirmed: '#52C41A',
    completed: '#86909C',
    cancelled: '#C9CDD4'
  };
  return map[status] || '#86909C';
};
