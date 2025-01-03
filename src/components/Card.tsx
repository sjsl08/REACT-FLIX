import React from 'react';
import { useCardContext } from '../context/CardContext'; // Adjust the import path
import { Movie } from '../types/types'; // Adjust the import path as necessary

interface CardProps {
    item: Movie;
}

import './Card.css'

const Card: React.FC<CardProps> = ({ item }) => {
    const { setCardState, cardState } = useCardContext(); // Use context

    const handleHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        if (cardState.cardId === item.id && cardState.isHovered) return;

        const cardElement = e.currentTarget as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect()


        setCardState({
            item,
            isHovered: true,
            cardId: item.id,
            position: { x: cardRect.left + cardRect.width / 2, y: cardRect.top  }

        });

        console.log(cardState, item);

    };



    return (
        <div
            className="card pointer-events-auto relative sm:w-56 w-36"
            onMouseEnter={handleHover}
            role="presentation"
        >
            <img
                src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`}
                alt={item.title}
                className="w-full h-auto"
            />
        </div>
    );
};

export default Card;