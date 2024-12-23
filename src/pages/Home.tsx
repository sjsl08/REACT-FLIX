// Home.tsx
import React, { useEffect } from 'react';
import { useMovieContext } from '../context/MovieContext'; // Import the context
import { tmdbApi } from '../tmdbApi';
import Hero from '../components/Hero'; // Assuming you have a Hero component

const Home: React.FC = () => {
    const {
        setSelectedMovie,
        setIsModalOpen,
    } = useMovieContext(); // Use context

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const popularMovies = await tmdbApi.fetchPopularMovies();
                const randomIndex = Math.floor(Math.random() * (popularMovies.results.length || 0));
                const selected = popularMovies.results[randomIndex];

                // Set the selected movie in context
                setSelectedMovie(selected);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        loadMovies();
    }, [setSelectedMovie, setIsModalOpen]);

    return (
        <div>
            <Hero />
            {/* Other components */}
        </div>
    );
};

export default Home;