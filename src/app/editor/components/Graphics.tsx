
import React from 'react'
import GraphicsItems from './GraphicsItems'


const Graphics = () => {
    return (
        <div className="flex flex-col w-full h-full p-4">
            <div className="flex justify-between w-full mb-8">
                <p className='text-xl font-bold'>Graphics</p>
                <span className="material-symbols-outlined">
                    close
                </span>
            </div>
            <div className="w-full overflow-auto">
            <GraphicsItems title={"Text element"}/>
            <div className='w-full border-[0.1px] border-[#c2c2c246] my-4'></div>
            <GraphicsItems title={"Text element"} />
            <div className='w-full border-[0.1px] border-[#c2c2c246] my-4 '></div>
            <GraphicsItems title={"Text element"} />
            <div className='w-full border-[0.1px] border-[#c2c2c246] my-4'></div>
            </div>
        </div>
    )
}

export default Graphics