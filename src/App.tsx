// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Watch from './pages/Watch';
import MyList from './pages/MyList';
import Navbar from './components/Navbar';
import { MovieProvider } from './context/MovieContext';
import Modal from './components/Modal';
import { useMovieContext } from './context/MovieContext'; // Import the context
import { CardProvider, useCardContext } from './context/CardContext';
import PopupCard from './components/PopupCard';
import { UtilsProvider } from './context/UtilsContext';
import Search from './pages/Search'
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <MovieProvider>
      <CardProvider>
        <UtilsProvider>
          <Router>
            <MainContent />
          </Router>
        </UtilsProvider>
      </CardProvider>
    </MovieProvider>
  );
};

const MainContent: React.FC = () => {
  const {
    selectedMovie,
    isModalOpen,
    setIsModalOpen
  } = useMovieContext(); // Use context


  const { cardState } = useCardContext();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <Modal movieData={selectedMovie} isOpen={isModalOpen} onClose={closeModal}>
        <h2>{selectedMovie?.title}</h2>
        <p>{selectedMovie?.overview}</p>
      </Modal>
      <PopupCard isHovered={cardState.isHovered} x={cardState.position?.x || 0} y={cardState.position?.y || 0} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/watch/:id' element={<Watch />} />
        <Route path='/myList' element={<MyList />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;