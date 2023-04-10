import React from 'react';
import { BsArrowLeft } from 'react-icons/bs'
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const { data } = useMovie(movieId as string);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-2 bg-black bg-opacity-70">
        <BsArrowLeft onClick={() => router.back()} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
        <p className="text-white text-xl md:text-1xl font-semibold">
          {data?.title}
        </p>
      </nav>
      <video className="h-full w-full" autoPlay controls src={data?.videoUrl}></video>
    </div>
  )
}

export default Watch;