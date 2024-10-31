"use client";

import { createContext, useState } from 'react';
import { Selection } from '@nextui-org/react';

interface SelectedEvaluationContextType {
    selectedKeys: Selection;
    setSelectedKeys: React.Dispatch<React.SetStateAction<Selection>>;
}

export const SelectedEvaluationContext = createContext<SelectedEvaluationContextType>({
    selectedKeys: new Set(),
    setSelectedKeys: () => {}
});

export function SelectedEvaluationProvider({ children } 
    : {children: React.ReactNode; }) {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

    return (
        <SelectedEvaluationContext.Provider value={{selectedKeys, setSelectedKeys}}>
        {children}
        </SelectedEvaluationContext.Provider>
    );
}