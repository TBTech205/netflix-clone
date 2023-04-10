import React from 'react'
import { isEmpty } from 'lodash'
import { BsChevronDown } from 'react-icons/bs'
import { PlayButton } from '@/components/PlayButtons'
import FavoriteButton from '@/components/FavoriteButton'

interface MovieListProps {
  data: Record<string, any>[];
  title: string;
}
interface MovieCardProps {
  data: Record<string, any>;
}

const MoveCard: React.FC<MovieCardProps> = ({ data }) => {
  return (
    <div className="group bg-zinc-900 text-white col-span relative h-[12vw] rounded-md">
      <img
        className="w-full h-[12vw] cursor-pointer object-cover transition duration shadow-xl rounded-md delay-300 group-hover:opacity-90 sm:group-hover:opacity-0"
        src={data?.thumbnailUrl}
        alt="Thumbnail"
      />

      <div className="absolute top-0 z-10 w-full opacity-0 transition duration-200 invisible delay-300 scale-0 group-hover:scale-150 group-hover:-translate-y-[6vw] group-hover:translate-x-[5vw] group-hover:opacity-100 sm:visible">
        <img
          className="w-full h-[12vw] cursor-pointer object-cover transition duration shadow-xl rounded-t-md"
          src={data?.thumbnailUrl}
          alt="Thumbnail"
        />

        <div className="absolute z-10 w-full h-full bg-zinc-800 shadow-md rounded-b-md p-2 md:p-3 lg:p-5">
          <div className="flex justify-between">
            <div className="flex gap-1">
              <PlayButton movieId={data?.id} />
              <FavoriteButton movieId={data?.id} />
            </div>
            <div>
              <button
                className="flex justify-center items-center text-white bg-zinc-600 cursor-pointer h-6 w-6 rounded-full lg:h-10 lg:w-10 hover:bg-zinc-700"
                onClick={() => {}}
              >
                <BsChevronDown />
              </button>
            </div>
          </div>

          <div className="flex gap-[6px] items-center mt-2">
            <h2 className="text-green-700 text-[12px] font-semibold">New</h2>
            <p className="text-[12px] font-semibold">6+</p>
            <p className="text-[10px] mt-1">{data?.duration}</p>
          </div>
          
          <p className="text-[12px] font-semibold">{data?.genre}</p>
        </div>
      </div>
    </div>
  )
};

const useMovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="px-4 mt-4 space-y-8 md:px-12">
      <div className="flex flex-col gap-3">
        <h2 className="text-white text-lg font-bold md-4 md:text-xl lg:text-2xl">{title}</h2>
        <div className="grid grid-cols-4 gap-2">
          {data.map((data) => (
            <MoveCard key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default useMovieList