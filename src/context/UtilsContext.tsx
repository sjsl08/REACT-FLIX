import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useCardContext } from './CardContext';


// Define the context value type
interface UtilsContextValue {
  addToFavoriteList: (movie: Movie) => void;
  movieList: Movie[];
}

// Create the context with an empty initial value, using the defined type
const UtilsContext = createContext<UtilsContextValue | undefined>(undefined);

// Define the provider component
export const UtilsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [movieList, setMovieList] = useState<Movie[]>([]);

    const {setCardState} = useCardContext()

  const addToFavoriteList = (movie: Movie) => {
    let list = localStorage.getItem('list');

    if (list) {
      try {
        const parsedList = JSON.parse(list) as Movie[];
        setMovieList(parsedList);

        const exists = parsedList.some((m) => m.id === movie.id);

        if (exists) {
          const newMovieList = parsedList.filter((m) => m.id !== movie.id);
          setMovieList(newMovieList);
          localStorage.setItem('list', JSON.stringify(newMovieList));
            setCardState((prev: any) => ({
                ...prev,
                isHovered: false,
            }));
          return;
        }
      } catch (error) {
        localStorage.removeItem('list');
        setMovieList([]);
      }
    }

    const updatedList = [...movieList, movie];
    setMovieList(updatedList);

    try {
      localStorage.setItem('list', JSON.stringify(updatedList));
    } catch (error) {
      console.error('Error saving the movie to localStorage:', error);
    }
  };

  return (
    <UtilsContext.Provider value={{ addToFavoriteList, movieList }}>
      {children}
    </UtilsContext.Provider>
  );
};

// Create a custom hook for accessing the context
export const useUtilsContext = (): UtilsContextValue => {
  const context = useContext(UtilsContext);
  if (!context) {
    throw new Error('useUtilsContext must be used within a UtilsProvider');
  }
  return context;
};