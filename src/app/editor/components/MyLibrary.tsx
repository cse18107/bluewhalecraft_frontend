import Image from 'next/image'
import React from 'react'
import useImageStore from '@/store/image/ImageStore';

const MyLibrary = () => {
    const images = useImageStore((state) => state.images)
    return (
        <div className="flex flex-col w-full h-full p-4">
            <div className="flex justify-between w-full mb-8">
                <p className='text-xl font-bold'>My Library</p>
                <span className="material-symbols-outlined">
                    close
                </span>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-auto'>
                {images.map((image, index) => {
                    return <div key={index} className="aspect-square bg-gray-100 border-[1px] border-[#c2c2c2] rounded-md relative"
                        style={{ backgroundImage: `url('/background_transparent.jfif')` }}>
                        <Image src={image.url || ""} width={100} height={100} className="w-full h-full object-contain" alt="" />
                        <span className="material-symbols-outlined absolute top-0 right-0 rounded-full p-[0.2rem] bg-white m-1 border-[1px] border-[#b4b4b4]">
                            delete
                        </span>
                    </div>
                })}
            </div>
        </div>
    )
}

export default MyLibrary