import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CardState {
    item: any; // Replace `any` with your movie type
    isHovered: boolean;
    cardId: number | null;
    position?: { x: number; y: number } ;
}

interface CardContextType {
    cardState: CardState;
    setCardState: (state: CardState) => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cardState, setCardState] = useState<CardState>({
        item: null,
        isHovered: true,
        cardId: null,
        position: { x: 0, y: 0 },
    });

    return (
        <CardContext.Provider value={{ cardState, setCardState }}>
            {children}
        </CardContext.Provider>
    );
};

export const useCardContext = () => {
    const context = useContext(CardContext);
    if (!context) {
        throw new Error('useCardContext must be used within a CardProvider');
    }
    return context;
};