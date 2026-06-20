// 诉求类型
export type DemandType = 'clean' | 'fill' | 'whiten' | 'implant';

// 年龄段
export type AgeGroup = 'child' | 'teen' | 'adult' | 'senior';

// 疼痛程度
export type PainLevel = 'none' | 'mild' | 'moderate' | 'severe';

// 预算范围
export type BudgetRange = 'low' | 'medium' | 'high' | 'premium';

// 问答表单数据
export interface QuestionnaireData {
  demand: DemandType | null;
  ageGroup: AgeGroup | null;
  hasXRay: boolean | null;
  painLevel: PainLevel | null;
  budget: BudgetRange | null;
}

// 套餐包含项目
export interface PackageItem {
  name: string;
  description: string;
  count: number;
}

// 另收项目
export interface ExtraItem {
  name: string;
  priceRange: string;
  description: string;
}

// 价格组成
export interface PriceBreakdown {
  doctorService: number;
  materials: number;
  imaging: number;
  followUp: number;
}

// 套餐信息
export interface DentalPackage {
  id: string;
  name: string;
  category: DemandType;
  price: number;
  originalPrice: number;
  tag?: string;
  clinicName: string;
  rating: number;
  reviewCount: number;
  includes: PackageItem[];
  extraItems: ExtraItem[];
  priceBreakdown: PriceBreakdown;
  followUpCount: number;
  duration: string;
  suitableFor: string[];
  description: string;
}

// 预约记录状态
export type ReservationStatus = 'locked' | 'confirmed' | 'completed' | 'cancelled' | 'inapplicable' | 'reconfirmed';

// 不适用处理意向
export type HandleIntention = 'accept_advice' | 'see_alternative' | 'defer';

// 沟通记录项
export interface CommunicationItem {
  id: string;
  time: string;
  type: 'doctor' | 'patient';
  content: string;
  intention?: HandleIntention;
}

// 预约记录
export interface ReservationRecord {
  id: string;
  packageId: string;
  packageName: string;
  clinicName: string;
  price: number;
  lockDate: string;
  expireDate: string;
  status: ReservationStatus;
  createTime: string;
  inapplicableReason?: string;
  lastIntention?: HandleIntention;
  communications: CommunicationItem[];
}

// 推荐匹配结果
export interface RecommendResult {
  packages: DentalPackage[];
  budgetMatch: 'perfect' | 'partial' | 'none';
  budgetTip?: string;
  alternativeTip?: string;
}

// 诊所信息
export interface ClinicInfo {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
}

// 价格组成说明项
export interface PriceGuideItem {
  category: string;
  icon: string;
  items: {
    name: string;
    description: string;
    priceRange: string;
  }[];
}
