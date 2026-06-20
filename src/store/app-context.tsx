import React, { createContext, useContext, useState, ReactNode } from 'react';
import { QuestionnaireData, ReservationRecord, DemandType } from '@/types';

interface AppContextType {
  questionnaireData: QuestionnaireData;
  updateQuestionnaire: (data: Partial<QuestionnaireData>) => void;
  resetQuestionnaire: () => void;
  reservations: ReservationRecord[];
  addReservation: (reservation: ReservationRecord) => void;
  updateReservation: (id: string, data: Partial<ReservationRecord>) => void;
}

const defaultQuestionnaireData: QuestionnaireData = {
  demand: null,
  ageGroup: null,
  hasXRay: null,
  painLevel: null,
  budget: null
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData>(defaultQuestionnaireData);
  const [reservations, setReservations] = useState<ReservationRecord[]>([
    {
      id: 'res-001',
      packageId: 'pkg-001',
      packageName: '基础洁牙护理套餐',
      clinicName: '悦齿口腔诊所',
      price: 198,
      lockDate: '2026-06-20',
      expireDate: '2026-06-27',
      status: 'locked',
      createTime: '2026-06-20 10:30'
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
      communicationLog: '医生检查后确认适合美白治疗，已预约6月25日到店'
    }
  ]);

  const updateQuestionnaire = (data: Partial<QuestionnaireData>) => {
    setQuestionnaireData(prev => ({ ...prev, ...data }));
  };

  const resetQuestionnaire = () => {
    setQuestionnaireData(defaultQuestionnaireData);
  };

  const addReservation = (reservation: ReservationRecord) => {
    setReservations(prev => [reservation, ...prev]);
  };

  const updateReservation = (id: string, data: Partial<ReservationRecord>) => {
    setReservations(prev =>
      prev.map(r => (r.id === id ? { ...r, ...data } : r)
    );
  };

  return (
    <AppContext.Provider
      value={{
        questionnaireData,
        updateQuestionnaire,
        resetQuestionnaire,
        reservations,
        addReservation,
        updateReservation
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
