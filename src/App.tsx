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

const App: React.FC = () => {
  return (
    <MovieProvider>
      <Router>
        <MainContent />
      </Router>
    </MovieProvider>
  );
};

const MainContent: React.FC = () => {
  const {
    selectedMovie,
    isModalOpen,
    setIsModalOpen
  } = useMovieContext(); // Use context

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <Modal movieData={selectedMovie} isOpen={isModalOpen} onClose={closeModal}>
        <h2>{selectedMovie?.title}</h2>
        <p>{selectedMovie?.overview}</p>
        {/* Add more content as needed */}
      </Modal>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/watch/:id' element={<Watch />} />
        <Route path='/myList' element={<MyList />} />
      </Routes>
    </>
  );
};

export default App;