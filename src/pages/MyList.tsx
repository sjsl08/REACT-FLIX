import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { useUtilsContext } from '../context/UtilsContext';

const MyList: React.FC = () => {

    const {movieList} = useUtilsContext()
    const [movies, setMovies] = useState<Movie[]>(movieList); // Define Movie type if needed

    // useEffect(() => {
    //     const storedMovies = JSON.parse(localStorage.getItem('list') || "[]");
    //     setMovies(storedMovies);
    // }, []);

    useEffect(() => {
        setMovies(movieList);
    }, [movieList]);

    return (
        <div className="absolute top-36 flex flex-wrap left-12 gap-4">
            {movies.length > 0 ? (
                movies.map((item, index) => (
                    <Card key={index} item={item} /> // Pass the movie item to the Card component
                ))
            ) : (
                <p className="text-white text-xl">No movies in your list...</p>
            )}
        </div>
    );
};

export default MyList;