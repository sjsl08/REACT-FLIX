import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Movie } from './types/types'; // Adjust the import path as necessary

interface MovieContextType {
    selectedMovie: Movie | null;
    setSelectedMovie: (movie: Movie | null) => void;
    trailerURL: string;
    setTrailerURL: (url: string) => void;
    playerMuted: boolean;
    setPlayerMuted: (muted: boolean) => void;
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [trailerURL, setTrailerURL] = useState<string>('');
    const [playerMuted, setPlayerMuted] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <MovieContext.Provider
            value={{
                selectedMovie,
                setSelectedMovie,
                trailerURL,
                setTrailerURL,
                playerMuted,
                setPlayerMuted,
                isModalOpen,
                setIsModalOpen,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};

export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('useMovieContext must be used within a MovieProvider');
    }
    return context;
};