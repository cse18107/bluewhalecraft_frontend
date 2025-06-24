import React from 'react'
import SnakeImage from '../../../../public/snake-1.png'
import Image from 'next/image'

const GraphicsItems = ({title}) => {
    return (
        <><div className='w-full flex justify-between mb-3'>
            <p className="font-bold">{title}</p>
            <p className="underline decoration-1 font-semibold">Show more</p>
        </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                <div className="aspect-square bg-gray-100 border-[1px] border-[#c2c2c2] rounded-md"
                    style={{ backgroundImage: `url('/background_transparent.jfif')` }}>
                    <Image src={SnakeImage} width={100} height={100} className="w-full h-full object-contain" alt="" />

                </div>
                <div className="aspect-square bg-gray-100 border-[1px] border-[#c2c2c2] rounded-md"
                    style={{ backgroundImage: `url('/background_transparent.jfif')` }}>
                    <Image src={SnakeImage} width={100} height={100} className="w-full h-full object-contain" alt="" />

                </div>
                <div className="aspect-square bg-gray-100 border-[1px] border-[#c2c2c2] rounded-md"
                    style={{ backgroundImage: `url('/background_transparent.jfif')` }}>
                    <Image src={SnakeImage} width={100} height={100} className="w-full h-full object-contain" alt="" />

                </div>
                <div className="aspect-square bg-gray-100 border-[1px] border-[#c2c2c2] rounded-md"
                    style={{ backgroundImage: `url('/background_transparent.jfif')` }}>
                    <Image src={SnakeImage} width={100} height={100} className="w-full h-full object-contain" alt="" />

                </div>

                <div className="aspect-square bg-gray-100 border-[1px] border-[#c2c2c2] rounded-md"
                    style={{ backgroundImage: `url('/background_transparent.jfif')` }}>
                    <Image src={SnakeImage} width={100} height={100} className="w-full h-full object-contain" alt="" />

                </div>
                <div className="aspect-square bg-gray-100 border-[1px] border-[#c2c2c2] rounded-md"
                    style={{ backgroundImage: `url('/background_transparent.jfif')` }}>
                    <Image src={SnakeImage} width={100} height={100} className="w-full h-full object-contain" alt="" />

                </div>
            </div>
        </>
    )
}

export default GraphicsItems