import React from 'react'
import { BsInfoCircle } from 'react-icons/bs'
import useBillboard from '@/hooks/useBillboard'
import { PlayButtonWithText } from '@/components/PlayButtons'

const Billboard = () => {
	const { data } = useBillboard()

	return (
		<div className="relative h-[60vw] md:h-[40vw] lg:h-[56vw]">
			<video
				className="w-full h-[56vw] object-cover"
				src={data?.videoUrl}
				poster={data?.thumbnailUrl}
				muted
				loop
        controls={false}
			></video>
			<div className="absolute text-white top-[30%] ml-4 md:top-[35%] md:ml-16">
				<h2 className="h-full font-bold drop-shadow-xl text-[15px] md:text-4xl lg:text-6xl">{data?.title}</h2>
        <p className="mt-3 text-[12px] w-[70%] md:text-[17px] md:w-[65%] lg:w-[65%]">{data?.description}</p>
        <div className="flex gap-3">
          <PlayButtonWithText movieId={data?.id} />
          
          <button
            className="flex items-center gap-1 bg-gray-500 text-white px-4 py-1 mt-4 rounded-md hover:bg-gray-600"
          >
            <BsInfoCircle />
            More Info
          </button>
        </div>
      </div>
		</div>
	)
}

export default Billboard