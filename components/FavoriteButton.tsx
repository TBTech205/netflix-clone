import React, { useCallback, useMemo } from 'react'
import axios from 'axios'
import { BsPlus, BsCheckLg } from 'react-icons/bs'
import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorites from '@/hooks/useFavorites'

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    
    console.log(isFavorite);
    if (!isFavorite) {
      response = await axios.post('/api/favorite', { movieId });
    } else {
      response = await axios.delete('/api/favorite', { data: { movieId } });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({ 
      ...currentUser, 
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? BsCheckLg : BsPlus;
  
  return (
    <button
      onClick={toggleFavorites}
      className="flex justify-center items-center text-white bg-zinc-600 cursor-pointer h-6 w-6 rounded-full border border-zinc-600 lg:h-10 lg:w-10 hover:bg-zinc-700"
      disabled={true}
    >
      <Icon />
    </button>
  )
}

// hover:border-white
export default FavoriteButton;