import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const MyList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]); // Define Movie type if needed

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem('list') || "[]");
        setMovies(storedMovies);
    }, []);

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