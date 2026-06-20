import { DentalPackage, DemandType, RecommendResult, BudgetRange, RecommendExplanation } from '@/types';
import { getBudgetMax, getBudgetMin } from '@/utils';

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

const demandExplanationMap: Record<DemandType, string> = {
  clean: '您选择了牙齿清洁，我们筛选了洁牙类套餐，帮您去除牙菌斑和牙结石，维护口腔健康。',
  fill: '您选择了蛀牙修补，我们筛选了补牙类套餐，根据蛀牙程度和位置推荐合适的修复方案。',
  whiten: '您选择了牙齿变白，我们筛选了美白类套餐，从诊间冷光到居家美白供您选择。',
  implant: '您选择了缺牙修复，我们筛选了种植牙类套餐，不同品牌种植体满足不同预算和品质需求。'
};

const budgetExplanationMap: Record<BudgetRange, string> = {
  low: '实惠型预算（500元以内），优先推荐性价比高的基础方案。',
  medium: '舒适型预算（500-2000元），可以覆盖大部分洁牙和补牙项目。',
  high: '品质型预算（2000-8000元），可以选择更全面的检查和更高品质的材料。',
  premium: '高端型预算（8000元以上），预算充足，可选各类高端种植体和升级配置。'
};

const painExplanationMap: Record<string, string> = {
  none: '没有疼痛，说明问题可能还在早期，尽早检查治疗效果更好、费用更低。',
  mild: '轻微不适，建议尽快检查，早发现早治疗能避免更复杂的问题。',
  moderate: '明显疼痛，可能已经有较深龋齿或牙髓问题，建议优先选择含详细检查的套餐。',
  severe: '剧烈疼痛，可能需要根管治疗等紧急处理，建议尽快到院检查，套餐外可能有额外项目。'
};

const xrayExplanationMap: Record<string, string> = {
  true: '您已拍过X光片，到院后医生可以直接参考，部分套餐的影像检查费用可能可以减免。',
  false: '您未拍过X光片，推荐选择含影像检查的套餐，帮助医生准确评估口腔状况。'
};

export const getRecommendedPackages = (demand: DemandType | null, budget: BudgetRange | null, painLevel?: string | null, hasXRay?: boolean | null): RecommendResult => {
  if (!demand) {
    return {
      packages: [],
      budgetMatch: 'none',
      alternativeTip: '请先选择您的诉求，我们为您精准推荐'
    };
  }

  const demandPackages = getPackagesByCategory(demand);
  const budgetMax = budget ? getBudgetMax(budget) : 999999;
  const budgetMin = budget ? getBudgetMin(budget) : 0;

  const buildExplanation = (): RecommendExplanation => {
    return {
      demandReason: demandExplanationMap[demand] || '根据您的诉求筛选了对应类型的套餐。',
      budgetReason: budget ? budgetExplanationMap[budget] : '未限定预算，为您展示所有可选方案。',
      painReason: painLevel ? painExplanationMap[painLevel] : undefined,
      xrayReason: hasXRay !== null && hasXRay !== undefined ? xrayExplanationMap[String(hasXRay)] : undefined,
      summary: ''
    };
  };

  const maxPriceInCategory = Math.max(...demandPackages.map(p => p.price));
  const allWithinBudget = demandPackages.every(pkg => pkg.price <= budgetMax);
  const allBelowBudgetMin = demandPackages.every(pkg => pkg.price < budgetMin);

  if (allWithinBudget && allBelowBudgetMin && budget) {
    const sorted = [...demandPackages].sort((a, b) => b.price - a.price);
    const explanation = buildExplanation();
    explanation.budgetReason = `您的预算充足，该类目下所有套餐都在预算范围内，甚至还有更高配置可选。已按品质从高到低为您排列。`;
    explanation.summary = '预算非常宽裕，所有方案均可选择，推荐关注更高配置的套餐获得更好体验。';
    return {
      packages: sorted.slice(0, 3),
      budgetMatch: 'sufficient',
      explanation
    };
  }

  if (allWithinBudget) {
    const sorted = [...demandPackages].sort((a, b) => b.price - a.price);
    const explanation = buildExplanation();
    explanation.summary = '您的预算可以覆盖该类目下所有套餐，可以根据个人偏好选择。';
    return {
      packages: sorted.slice(0, 3),
      budgetMatch: 'perfect',
      explanation
    };
  }

  const perfectMatch = demandPackages.filter(
    pkg => pkg.price <= budgetMax
  );

  if (perfectMatch.length > 0) {
    const sorted = [...perfectMatch].sort((a, b) => b.price - a.price);
    const explanation = buildExplanation();
    explanation.summary = `您的预算可以覆盖部分套餐，已优先为您展示预算内的方案。`;
    return {
      packages: sorted.slice(0, 3),
      budgetMatch: 'perfect',
      explanation
    };
  }

  const closeMatch = demandPackages.filter(
    pkg => pkg.price <= budgetMax * 1.5
  ).sort((a, b) => a.price - b.price).slice(0, 3);

  if (closeMatch.length > 0) {
    const lowestPrice = Math.min(...demandPackages.map(p => p.price));
    let budgetTip = '';
    let alternativeTip = '';
    const explanation = buildExplanation();

    if (demand === 'implant') {
      budgetTip = `缺牙修复类项目价格相对较高，最低约 ¥${lowestPrice} 起。`;
      alternativeTip = '建议先到诊所做口腔检查，了解具体方案后再决定。也可咨询活动义齿等更经济的修复方式。';
    } else if (demand === 'whiten') {
      budgetTip = `美白类项目最低约 ¥${lowestPrice} 起，略高于您的预算。`;
      alternativeTip = '您也可以先做洁牙套餐，去除表面色素沉着，也能在一定程度上改善牙齿色泽。';
    } else if (demand === 'fill') {
      budgetTip = `补牙价格根据蛀牙程度不同有所差异，最低约 ¥${lowestPrice} 起。`;
      alternativeTip = '建议尽早治疗，越早治疗费用越低。可以到店先拍片检查再确认最终费用。';
    } else {
      budgetTip = `部分套餐价格略高于您的预算，已为您推荐价格最接近的选项。`;
      alternativeTip = '您也可以调整预算范围，或先到店咨询了解详情后再做决定。';
    }

    explanation.summary = `当前诉求下的套餐价格超出预算，已为您推荐最接近预算的选项。`;
    return {
      packages: closeMatch,
      budgetMatch: 'partial',
      budgetTip,
      alternativeTip,
      explanation
    };
  }

  const demandLabel = {
    clean: '牙齿清洁',
    fill: '蛀牙修补',
    whiten: '牙齿变白',
    implant: '缺牙修复'
  }[demand];

  let budgetTip = `当前${demandLabel}类项目价格均高于您的预算范围。`;
  let alternativeTip = '';
  const explanation = buildExplanation();

  if (demand === 'implant') {
    alternativeTip = '缺牙修复可以考虑活动义齿、固定桥等更经济的方案。建议先到诊所拍片检查，让医生给出具体建议。';
  } else if (demand === 'whiten') {
    alternativeTip = '建议先做基础洁牙，去除牙结石和表面色素。日常注意口腔卫生也能改善牙齿外观。';
  } else {
    alternativeTip = '建议先到店做基础检查，让医生评估具体情况后再选择最适合您的方案。';
  }

  explanation.summary = `暂时没有符合预算的${demandLabel}方案，可以查看其他经济型方案或到院咨询。`;
  const otherPackages = getPackagesByBudget(budget || 'low').slice(0, 2);

  return {
    packages: otherPackages.length > 0 ? otherPackages : [],
    budgetMatch: 'none',
    budgetTip,
    alternativeTip,
    explanation
  };
};
