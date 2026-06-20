import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Taro from '@tarojs/taro';
import { QuestionnaireData, ReservationRecord, DemandType, CommunicationItem, HandleIntention } from '@/types';
import { generateId, formatDateTime } from '@/utils';

interface AppContextType {
  questionnaireData: QuestionnaireData;
  updateQuestionnaire: (data: Partial<QuestionnaireData>) => void;
  resetQuestionnaire: () => void;
  reservations: ReservationRecord[];
  addReservation: (reservation: ReservationRecord) => void;
  updateReservation: (id: string, data: Partial<ReservationRecord>) => void;
  markInapplicable: (id: string, reason: string) => void;
  addCommunication: (id: string, content: string, type: 'doctor' | 'patient', intention?: HandleIntention, confirmedAt?: string) => void;
  getReservationById: (id: string) => ReservationRecord | undefined;
  isLoaded: boolean;
}

const defaultQuestionnaireData: QuestionnaireData = {
  demand: null,
  ageGroup: null,
  hasXRay: null,
  painLevel: null,
  budget: null
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'dental_reservations';

const getInitialReservations = (): ReservationRecord[] => {
  try {
    const stored = Taro.getStorageSync(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('[AppContext] 读取本地存储失败:', e);
  }
  return [
    {
      id: 'res-001',
      packageId: 'pkg-001',
      packageName: '基础洁牙护理套餐',
      clinicName: '悦齿口腔诊所',
      price: 198,
      lockDate: '2026-06-20',
      expireDate: '2026-06-27',
      status: 'locked',
      createTime: '2026-06-20 10:30',
      communications: [
        {
          id: 'comm-001',
          time: '2026-06-20 10:30',
          type: 'patient',
          content: '已成功锁定套餐价格，有效期至6月27日'
        }
      ]
    },
    {
      id: 'res-002',
      packageId: 'pkg-005',
      packageName: '冷光美白基础套餐',
      clinicName: '美齿口腔门诊部',
      price: 980,
      lockDate: '2026-06-15',
      expireDate: '2026-06-22',
      status: 'confirmed',
      createTime: '2026-06-15 14:20',
      communications: [
        {
          id: 'comm-002',
          time: '2026-06-15 14:20',
          type: 'patient',
          content: '已成功锁定套餐价格'
        },
        {
          id: 'comm-003',
          time: '2026-06-16 09:15',
          type: 'doctor',
          content: '医生检查后确认适合美白治疗，已预约6月25日到店'
        }
      ]
    }
  ];
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData>(defaultQuestionnaireData);
  const [reservations, setReservations] = useState<ReservationRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = getInitialReservations();
    setReservations(data);
    setIsLoaded(true);
    console.log('[AppContext] 初始化完成，预约记录数:', data.length);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        Taro.setStorageSync(STORAGE_KEY, JSON.stringify(reservations));
        console.log('[AppContext] 已保存到本地存储，记录数:', reservations.length);
      } catch (e) {
        console.warn('[AppContext] 保存到本地存储失败:', e);
      }
    }
  }, [reservations, isLoaded]);

  const updateQuestionnaire = (data: Partial<QuestionnaireData>) => {
    setQuestionnaireData(prev => ({ ...prev, ...data }));
  };

  const resetQuestionnaire = () => {
    setQuestionnaireData(defaultQuestionnaireData);
  };

  const addReservation = (reservation: ReservationRecord) => {
    setReservations(prev => [reservation, ...prev]);
    console.log('[AppContext] 新增预约记录:', reservation.id);
  };

  const updateReservation = (id: string, data: Partial<ReservationRecord>) => {
    setReservations(prev =>
      prev.map(r => (r.id === id ? { ...r, ...data } : r))
    );
  };

  const getReservationById = (id: string): ReservationRecord | undefined => {
    return reservations.find(r => r.id === id);
  };

  const markInapplicable = (id: string, reason: string) => {
    const commItem: CommunicationItem = {
      id: generateId(),
      time: formatDateTime(new Date()),
      type: 'doctor',
      content: reason
    };
    setReservations(prev =>
      prev.map(r =>
        r.id === id
          ? {
              ...r,
              status: 'inapplicable',
              inapplicableReason: reason,
              communications: [...r.communications, commItem]
            }
          : r
      )
    );
    console.log('[AppContext] 标记不适用:', id);
  };

  const addCommunication = (id: string, content: string, type: 'doctor' | 'patient', intention?: HandleIntention, confirmedAt?: string) => {
    const commItem: CommunicationItem = {
      id: generateId(),
      time: formatDateTime(new Date()),
      type,
      content,
      intention,
      confirmedAt
    };
    setReservations(prev =>
      prev.map(r => {
        if (r.id !== id) return r;
        const newComms = [...r.communications, commItem];
        const updateData: Partial<ReservationRecord> = {
          status: type === 'patient' ? 'reconfirmed' : r.status,
          lastIntention: intention || r.lastIntention,
          communications: newComms
        };
        if (confirmedAt) {
          updateData.confirmedAt = confirmedAt;
        }
        return { ...r, ...updateData };
      })
    );
    console.log('[AppContext] 新增沟通记录:', id, type, intention || '');
  };

  return (
    <AppContext.Provider
      value={{
        questionnaireData,
        updateQuestionnaire,
        resetQuestionnaire,
        reservations,
        addReservation,
        updateReservation,
        markInapplicable,
        addCommunication,
        getReservationById,
        isLoaded
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
