
import { useState, useEffect } from 'react';

export interface SurfaceHistoryEntry {
  id?: string;
  date: string;
  action: string;
  details: string;
  crop?: string;
}

export const useSurfaceHistory = (surfaceId?: string) => {
  const [history, setHistory] = useState<SurfaceHistoryEntry[]>([
    { date: '2024-05-01', action: 'Plantation', details: 'Plantation de pommes de terre calibre moyen', crop: 'Pommes de terre' },
    { date: '2024-03-15', action: 'Préparation', details: 'Labour et fertilisation du sol', crop: null },
    { date: '2024-01-20', action: 'Récolte', details: 'Récolte de légumes', crop: 'Légumes' },
    { date: '2023-10-10', action: 'Plantation', details: 'Plantation de légumes de saison', crop: 'Légumes' }
  ]);

  const addHistoryEntry = (entry: SurfaceHistoryEntry) => {
    setHistory(prev => [entry, ...prev]);
  };

  return {
    history,
    addHistoryEntry
  };
};
