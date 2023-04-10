import React from "react";
import { useRouter } from "next/router";
import { BsFillPlayFill } from 'react-icons/bs'

interface PlayButtonProps {
  movieId: string;
}

const PlayButtonWithText: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className="flex items-center gap-1 bg-white text-black px-4 py-1 mt-4 rounded-md"
    >
      <BsFillPlayFill className="text-black" />
      Play
    </button>
  )
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className="flex justify-center items-center bg-white cursor-pointer h-6 w-6 rounded-full lg:h-10 lg:w-10 hover:bg-neutral-200"
    >
      <BsFillPlayFill className="text-black" />
    </button>
  )
}

export { PlayButtonWithText, PlayButton }