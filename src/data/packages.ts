import { DentalPackage, DemandType } from '@/types';

export const packagesData: DentalPackage[] = [
  {
    id: 'pkg-001',
    name: '基础洁牙护理套餐',
    category: 'clean',
    price: 198,
    originalPrice: 380,
    tag: '人气推荐',
    clinicName: '悦齿口腔诊所',
    rating: 4.8,
    reviewCount: 1256,
    includes: [
      { name: '口腔全景检查', description: '全面检查口腔健康状况', count: 1 },
      { name: '超声波洁牙', description: '去除牙菌斑和牙结石', count: 1 },
      { name: '牙齿抛光', description: '光滑牙面,延缓色素沉积', count: 1 },
      { name: '口腔卫生指导', description: '教你正确的刷牙方式', count: 1 }
    ],
    extraItems: [
      { name: '牙周深度清洁', priceRange: '200-500元', description: '如检查发现牙周问题需额外收费' },
      { name: '氟化物治疗', priceRange: '100-200元', description: '预防龋齿,可选项目' }
    ],
    priceBreakdown: {
      doctorService: 80,
      materials: 30,
      imaging: 50,
      followUp: 38
    },
    followUpCount: 1,
    duration: '约45分钟',
    suitableFor: ['首次洁牙', '日常维护', '牙龈轻度出血'],
    description: '适合初次洁牙或定期口腔维护的人群,温和清洁,保护牙釉质。'
  },
  {
    id: 'pkg-002',
    name: '深度洁牙SPA套餐',
    category: 'clean',
    price: 398,
    originalPrice: 680,
    tag: '舒适体验',
    clinicName: '悦齿口腔诊所',
    rating: 4.9,
    reviewCount: 876,
    includes: [
      { name: '口腔全面检查', description: '含数字化影像分析', count: 1 },
      { name: '超声波深度洁牙', description: '全口牙周清洁', count: 1 },
      { name: '喷砂洁牙', description: '去除烟渍茶渍', count: 1 },
      { name: '牙齿抛光', description: '专业抛光护理', count: 1 },
      { name: '牙周护理', description: '牙周上药护理', count: 1 },
      { name: '口腔spa', description: '牙龈按摩放松', count: 1 }
    ],
    extraItems: [
      { name: '牙周刮治', priceRange: '300-800元/象限', description: '深度牙周治疗' }
    ],
    priceBreakdown: {
      doctorService: 150,
      materials: 60,
      imaging: 80,
      followUp: 108
    },
    followUpCount: 2,
    duration: '约90分钟',
    suitableFor: ['有牙结石', '吸烟人群', '喝茶咖啡人群'],
    description: '适合有烟渍茶渍、需要深度清洁的人群,全方位呵护口腔健康。'
  },
  {
    id: 'pkg-003',
    name: '儿童树脂补牙套餐',
    category: 'fill',
    price: 298,
    originalPrice: 450,
    tag: '儿童专享',
    clinicName: '瑞尔儿童口腔',
    rating: 4.9,
    reviewCount: 632,
    includes: [
      { name: '口腔检查', description: '儿童友好型检查', count: 1 },
      { name: 'X光片检查', description: '必要时拍摄', count: 1 },
      { name: '树脂补牙', description: '进口纳米树脂材料', count: 1 },
      { name: '涂氟护理', description: '预防龋齿', count: 1 }
    ],
    extraItems: [
      { name: '根管治疗', priceRange: '800-1500元', description: '如蛀洞较深伤及牙神经' },
      { name: '预成冠修复', priceRange: '500-1000元', description: '乳牙大面积缺损时' }
    ],
    priceBreakdown: {
      doctorService: 120,
      materials: 100,
      imaging: 50,
      followUp: 28
    },
    followUpCount: 1,
    duration: '约30-45分钟',
    suitableFor: ['儿童浅龋', '预防龋齿', '乳牙修复'],
    description: '专为儿童设计,医生耐心温柔,让孩子不怕看牙。'
  },
  {
    id: 'pkg-004',
    name: '成人纳米树脂补牙',
    category: 'fill',
    price: 450,
    originalPrice: 680,
    tag: '耐用美观',
    clinicName: '悦齿口腔诊所',
    rating: 4.7,
    reviewCount: 528,
    includes: [
      { name: '口腔全面检查', description: '详细检查龋齿情况', count: 1 },
      { name: '咬合片检查', description: '确认蛀洞深度', count: 1 },
      { name: '纳米树脂补牙', description: '进口纳米树脂,美观耐用', count: 1 },
      { name: '调颌抛光', description: '确保咬合舒适', count: 1 }
    ],
    extraItems: [
      { name: '垫底充填', priceRange: '100-200元', description: '深龋近髓时需要' },
      { name: '根管治疗', priceRange: '1000-2500元', description: '伤及牙神经时需要' }
    ],
    priceBreakdown: {
      doctorService: 180,
      materials: 180,
      imaging: 60,
      followUp: 30
    },
    followUpCount: 1,
    duration: '约40-60分钟',
    suitableFor: ['成人龋齿', '门牙修复', '美观要求高'],
    description: '采用进口纳米树脂,颜色自然,耐磨持久,恢复牙齿美观和功能。'
  },
  {
    id: 'pkg-005',
    name: '冷光美白基础套餐',
    category: 'whiten',
    price: 980,
    originalPrice: 1680,
    tag: '明星同款',
    clinicName: '美齿口腔门诊部',
    rating: 4.8,
    reviewCount: 892,
    includes: [
      { name: '口腔健康检查', description: '美白前全面评估', count: 1 },
      { name: '牙齿比色', description: '记录术前牙齿颜色', count: 1 },
      { name: '洁牙抛光', description: '美白前清洁准备', count: 1 },
      { name: '冷光美白治疗', description: '美国进口美白剂', count: 1 },
      { name: '术后护理指导', description: '饮食和护理建议', count: 1 }
    ],
    extraItems: [
      { name: '美白加强剂', priceRange: '200-300元/支', description: '效果更持久' },
      { name: '脱敏治疗', priceRange: '150-300元', description: '敏感牙齿可选' }
    ],
    priceBreakdown: {
      doctorService: 300,
      materials: 450,
      imaging: 80,
      followUp: 150
    },
    followUpCount: 2,
    duration: '约60分钟',
    suitableFor: ['黄牙黑牙', '烟渍茶渍', '追求美观'],
    description: '冷光美白技术,一次治疗可提高3-8个色阶,安全不伤牙。'
  },
  {
    id: 'pkg-006',
    name: '家庭美白套装疗程',
    category: 'whiten',
    price: 1280,
    originalPrice: 1980,
    tag: '居家便捷',
    clinicName: '美齿口腔门诊部',
    rating: 4.7,
    reviewCount: 456,
    includes: [
      { name: '初诊检查', description: '口腔健康评估', count: 1 },
      { name: '牙齿取模', description: '定制专属牙托', count: 1 },
      { name: '定制美白牙托', description: '舒适贴合', count: 1 },
      { name: '美白凝胶', description: '2周用量', count: 2 },
      { name: '复查评估', description: '效果跟踪调整', count: 1 }
    ],
    extraItems: [
      { name: '补充装凝胶', priceRange: '300-500元/支', description: '后续维持使用' }
    ],
    priceBreakdown: {
      doctorService: 280,
      materials: 700,
      imaging: 100,
      followUp: 200
    },
    followUpCount: 3,
    duration: '居家使用2周',
    suitableFor: ['牙齿着色', '敏感牙齿', '时间不固定'],
    description: '居家使用,每天30分钟,2周见效,可定期维持美白效果。'
  },
  {
    id: 'pkg-007',
    name: '韩国进口种植牙',
    category: 'implant',
    price: 4980,
    originalPrice: 7800,
    tag: '性价比高',
    clinicName: '德伦口腔医院',
    rating: 4.9,
    reviewCount: 312,
    includes: [
      { name: '口腔CT检查', description: '三维影像评估骨量', count: 1 },
      { name: '种植方案设计', description: '专家定制方案', count: 1 },
      { name: '种植体植入', description: '韩国进口种植体', count: 1 },
      { name: '基台安装', description: '愈合基台', count: 1 },
      { name: '烤瓷牙冠', description: '生物相容性烤瓷冠', count: 1 },
      { name: '术后复查', description: '种植效果跟踪', count: 3 }
    ],
    extraItems: [
      { name: '植骨手术', priceRange: '2000-5000元', description: '骨量不足时需要' },
      { name: '上颌窦提升', priceRange: '3000-6000元', description: '上颌后牙区骨高度不足时' },
      { name: '全瓷牙冠升级', priceRange: '1500-3000元', description: '美观效果更佳' }
    ],
    priceBreakdown: {
      doctorService: 1500,
      materials: 2500,
      imaging: 500,
      followUp: 480
    },
    followUpCount: 5,
    duration: '3-6个月(含愈合期)',
    suitableFor: ['单颗缺牙', '多颗缺牙', '牙槽骨条件好'],
    description: '韩国进口种植体,品质可靠,性价比之选,恢复咀嚼功能。'
  },
  {
    id: 'pkg-008',
    name: '瑞士ITI种植牙',
    category: 'implant',
    price: 9800,
    originalPrice: 13800,
    tag: '高端品质',
    clinicName: '德伦口腔医院',
    rating: 4.9,
    reviewCount: 198,
    includes: [
      { name: '口腔CBCT检查', description: '高精度三维影像', count: 1 },
      { name: '专家会诊', description: '主任医师亲诊', count: 1 },
      { name: '种植方案设计', description: '数字化导板种植', count: 1 },
      { name: '瑞士ITI种植体', description: '高端亲水种植体', count: 1 },
      { name: '愈合基台', description: '促进软组织愈合', count: 1 },
      { name: '全瓷牙冠', description: '国产二氧化锆全瓷冠', count: 1 },
      { name: '定期复查维护', description: '长期效果保障', count: 6 }
    ],
    extraItems: [
      { name: '植骨粉骨膜', priceRange: '3000-8000元', description: '骨量不足时' },
      { name: '进口全瓷冠升级', priceRange: '2000-4000元', description: '色泽更自然' },
      { name: '镇静镇痛', priceRange: '500-1500元', description: '怕痛患者可选' }
    ],
    priceBreakdown: {
      doctorService: 2800,
      materials: 5200,
      imaging: 800,
      followUp: 1000
    },
    followUpCount: 8,
    duration: '2-6个月(视愈合情况)',
    suitableFor: ['缺牙修复', '对品质要求高', '骨条件一般'],
    description: '瑞士ITI种植体,国际一线品牌,愈合快,成功率高,长期稳定。'
  }
];

export const getPackagesByCategory = (category: DemandType): DentalPackage[] => {
  return packagesData.filter(pkg => pkg.category === category);
};

export const getPackageById = (id: string): DentalPackage | undefined => {
  return packagesData.find(pkg => pkg.id === id);
};

export const getPackagesByBudget = (budget: string): DentalPackage[] => {
  switch (budget) {
    case 'low':
      return packagesData.filter(pkg => pkg.price < 500);
    case 'medium':
      return packagesData.filter(pkg => pkg.price >= 500 && pkg.price < 2000);
    case 'high':
      return packagesData.filter(pkg => pkg.price >= 2000 && pkg.price < 8000);
    case 'premium':
      return packagesData.filter(pkg => pkg.price >= 8000);
    default:
      return packagesData;
  }
};
