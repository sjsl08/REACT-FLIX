import React, { useEffect, useState } from 'react';
import { Play, Volume2, VolumeOff, Check, Plus, ThumbsUp } from 'lucide-react';
// import SimilarMovieCard from './SimilarMovieCard'; // Ensure this component is imported
import { useNavigate } from 'react-router-dom';
import { tmdbApi } from '../tmdbApi';
import VideoPlayer from './VideoPlayer';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    movieData: any; // Replace with the correct type for movie data
    videoId?: string | null;
    muted?: boolean;
    toggleMuteVideo?: () => void;
    handleAddToFav?: () => void;
    addedToFav?: boolean;
    loadingSimilarMovies?: boolean;
    errorLoadingSimilar?: boolean;
    similarMovies?: Array<any>; // Replace with the correct type
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    movieData,
    muted = true,
    toggleMuteVideo,
    handleAddToFav,
    addedToFav = false,
    loadingSimilarMovies = false,
    errorLoadingSimilar = false,
    similarMovies = [],
}) => {
    const navigate = useNavigate();


    useEffect(() => {

        const fetchData = async () => {
            await tmdbApi.getMovieTrailer(movieData?.id).then((res) => {
                console.log(res);
                
                setvideoId(res.key);
            })
        }

        fetchData();

    },[])


    const [videoId, setvideoId] = useState('')
  

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
                className="modal-content w-[90%] md:w-[80%] lg:w-[50%] bg-[#141414] text-white rounded-lg relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-white text-3xl"
                    onClick={onClose}
                    aria-label="Close Modal"
                >
                    &times;
                </button>

                {/* Video Section */}
                {videoId ? (
                    <div className="relative">
                        <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-[#141414] to-transparent"></div>

                        <div className="absolute z-50 left-6 bottom-6 w-[90%]">
                            <p className="text-4xl font-bold mb-4">{movieData?.original_title}</p>

                            <div className="flex gap-4">
                                <button
                                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition"
                                    onClick={() => {
                                        navigate(`/watch/${movieData?.id}`);
                                        onClose();
                                    }}
                                >
                                    <Play size={20} />
                                    <span className="font-semibold">Play</span>
                                </button>

                                <button
                                    className="rounded-full p-3 border-2 border-gray-700 hover:border-white transition"
                                    onClick={handleAddToFav}
                                >
                                    {addedToFav ? (
                                        <Check className="text-white h-6 w-6" />
                                    ) : (
                                        <Plus className="text-white h-6 w-6" />
                                    )}
                                </button>

                                <button className="rounded-full p-3 border-2 border-gray-700 hover:border-white transition">
                                    <ThumbsUp className="text-white h-6 w-6" />
                                </button>
                            </div>

                            <button
                                onClick={toggleMuteVideo}
                                className="absolute right-6 bottom-6 rounded-full p-3 border-2 border-gray-700 hover:border-white transition"
                            >
                                {muted ? <VolumeOff /> : <Volume2 />}
                            </button>
                        </div>

                        <VideoPlayer videoId={videoId} isMuted={muted} />
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64 bg-gray-800">
                        <p>Video not available...</p>
                    </div>
                )}

                {/* Movie Details */}
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-green-400">
                            {movieData?.vote_average
                                ? `${(movieData.vote_average * 10).toFixed(0)}% Match`
                                : 'N/A'}
                        </span>
                        <span className="border border-gray-600 px-2 rounded-sm">
                            {movieData?.adult ? '18+' : '13+'}
                        </span>
                        <span className="font-bold">
                            {movieData?.runtime ? `${movieData.runtime} mins` : 'N/A'}
                        </span>
                        <span className="border border-gray-700 px-2 rounded-sm">4K</span>
                    </div>

                    <p>{movieData?.overview || 'No overview available.'}</p>

                    {/* Genres and Languages */}
                    <div className="mt-4">
                        <p>
                            <strong>Genres:</strong>{' '}
                            {movieData?.genres?.map((genre: any) => genre.name).join(', ') ||
                                'N/A'}
                        </p>
                        <p>
                            <strong>Languages:</strong>{' '}
                            {movieData?.spoken_languages
                                ?.map((lang: any) => lang.name)
                                .join(', ') || 'N/A'}
                        </p>
                    </div>

                    {/* Similar Movies */}
                    {loadingSimilarMovies ? (
                        <p className="mt-4 text-center">Loading Similar Movies...</p>
                    ) : errorLoadingSimilar ? (
                        <p className="mt-4 text-center text-red-500">
                            Error loading similar movies.
                        </p>
                    ) : similarMovies.length > 0 ? (
                        <div className="mt-4">
                            <h3 className="text-xl font-bold mb-4">More Like This</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {similarMovies.slice(0, 12).map((movie) => (
                                    <div
                                        key={movie.id}
                                        className="bg-gray-800 rounded-md p-4 cursor-pointer hover:bg-gray-700 transition"
                                        onClick={() => {
                                            navigate(`/watch/${movie.id}`);
                                            onClose();
                                        }}
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                            alt={movie.title}
                                            className="w-full h-48 object-cover rounded-md"
                                        />
                                    </div>
                                    // <SimilarMovieCard
                                    //     key={movie.id}
                                    //     id={movie.id.toString()}
                                    //     title={movie.title}
                                    //     description={movie.overview}
                                    //     imageUrl={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                    // />
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Modal;
