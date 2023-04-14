import React, { useCallback } from 'react'
import { BsInfoCircle } from 'react-icons/bs'
import useBillboard from '@/hooks/useBillboard'
import useInfoModal from '@/hooks/useInfoModal'
import { PlayButtonWithText } from '@/components/PlayButtons'

const Billboard = () => {
	const { data } = useBillboard()
	const { openModal } = useInfoModal()

	const openModalClick = useCallback(() => {
		openModal(data?.id)
	}, [openModal, data?.id])

	return (
		<div className="relative h-[60vw] md:h-[56.25vw] lg:h-[37vw]">
			<video
				className="w-full h-[60vw] md:h-[56.25vw] lg:h-[37vw] object-cover"
				src={data?.videoUrl}
				poster={data?.thumbnailUrl}
				muted
				loop
        controls={false}
			></video>
			<div className="text-white absolute bottom-[5%] ml-4 md:ml-16">
				<div className="bg-black bg-opacity-40 rounded-lg p-3 w-[70%] md:w-[65%] lg:w-[45%]">
					<h2 className="h-full font-bold drop-shadow-xl text-[15px] md:text-4xl lg:text-6xl">{data?.title}</h2>
					<p className="mt-3 text-[12px] md:text-[17px]">{data?.description}</p>
					<div className="flex gap-3">
						<PlayButtonWithText movieId={data?.id} />
						
						<button
							onClick={openModalClick}
							className="flex items-center gap-1 bg-gray-500 text-white px-4 py-1 mt-4 rounded-md hover:bg-gray-600"
						>
							<BsInfoCircle />
							More Info
						</button>
					</div>
      	</div>
			</div>
		</div>
	)
}

export default Billboard