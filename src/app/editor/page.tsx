'use client'
import React, { useState, useEffect } from 'react';
import LeftBar from './components/LeftBar';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import useImageStore from '@/store/image/ImageStore';
import ButtonIconHover from './components/ButtonIconHover';
import ButtonBGIconHover from './components/ButtonBGIconHover';
import EditLayerTshirt from './components/EditLayerTshirt';
const KonvaCanvas = dynamic(() => import('./components/KonvaCanvas'), { ssr: false });

const CLIP_RECT = { x: 732, y: 240, width: 200, height: 284 };
const RECT_INCHES = { height: 17, width: 12 };
const DPI = 16.66; 

const Page = () => {
  const [showEditLayer, setShowEditLayer] = React.useState(false);
  const [showZoomOptions, setShowZoomOptions] = React.useState(false);
  const [showImageEditOptions, setShowImageEditOptions] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const addImage = useImageStore((state) => state.addImage)
  const handleShowZoomOption = () => {
    setShowZoomOptions((value: any) => !value);
  }
  const handleImageEditOptions = () => {
    setShowImageEditOptions(true);
  }
  const handleAddImage = (image) => {
    console.log(image)
    const heightOfImageInch = image.scaledHeight / DPI;
    const widthOfImageInch = image.scaledWidth/ DPI;
    // if(heightOfImageInch > RECT_INCHES.height) 
    const obj = {
      url: image.dataUrl,
      title: image.name,
      width: image.height,
      height: image.width,
      scaledWidth: widthOfImageInch,  // Fits inside CLIP_RECT
      scaledHeight: heightOfImageInch,
      topPosition: 732,
      leftPosition: 240
    };
    addImage(obj)
  }
  // const handleAddImageMatrix = (obj) => {
  //   setMetrics(obj);
  // }

  return (
    <div className='flex h-screen'>
      <LeftBar setImages={handleAddImage}/>
      <div className='flex flex-col w-full h-screen '>
        <div className={`h-[65px] relative  w-full flex gap-3 items-center bg-[white] border-b-[1px] border-[#c5c5c5]`}>
          <div className='flex items-center gap-6 ml-5 z-4'>
            <ButtonIconHover icon={"info"}/>
            <div className="flex gap-2">
              <ButtonIconHover icon={"undo"}/>
              <ButtonIconHover icon={"redo"}/>
            </div>
          </div>
          {showImageEditOptions && <><div className='border-r-[1px] h-[55%] pl-3 pr-3 flex items-center justify-center gap-5 border-l-[1px] border-[#c5c5c5]'>
            <ButtonIconHover icon={"flip"}/>
            <ButtonIconHover icon={"info"}/>
            <ButtonIconHover icon={"fit_screen"}/>
            <ButtonIconHover icon={"aspect_ratio"}/>
            <ButtonIconHover icon={"background_replace"}/>
            <ButtonIconHover icon={"grain"}/>
            <ButtonIconHover icon={"crop"}/>
          </div>
          <div className='h-[55%] flex items-center justify-center gap-5 border-[#c5c5c5]'>
            <ButtonIconHover icon={"file_copy"}/>
            <ButtonIconHover icon={"delete"}/>
            <div className='flex items-center justify-center h-full text-[15px] font-[500] px-4  rounded-[4px] border-[1px] border-[#c5c5c5]'>Apply to all areas</div>
            <div className='flex items-center justify-center h-full text-[15px] font-[500] px-4  rounded-[4px] border-[1px] border-[#c5c5c5]'>Save as template</div>
          </div></>}
          <div className='flex h-[55%] absolute right-13 gap-3 items-center'>
            <div className='flex h-full'>
              <div className='flex items-center justify-center h-full w-[120px] text-[15px] font-[500] bg-[green] text-[gray] rounded-tl-[4px] rounded-bl-[4px] border-[1px] border-[#c5c5c5]'>Edit</div>
              <div className='flex items-center justify-center h-full w-[120px] text-[15px] font-[500] bg-[white] rounded-tr-[4px] rounded-br-[4px] border-[1px] border-[#c5c5c5]'>Preview</div>
            </div>
            <ButtonBGIconHover setShowEditLayer={setShowEditLayer} icon={"dashboard_customize"}/>
          </div>
          {showEditLayer && <EditLayerTshirt/>}
        </div>
        <KonvaCanvas handleImageEditOptions={handleImageEditOptions} images={images}/>
        <div className='h-[60px] w-full flex items-center bg-[white] border-t-[1px] border-[#c5c5c5]'>
          <div className="flex items-center gap-2 ml-5">
            <ButtonIconHover icon={"add"}/>
            <div className="flex items-center relative justify-between w-[90px] border-[1px] border-[#c5c5c5]">
              {showZoomOptions && <div className="absolute h-[400px] w-[90px] bg-[white] top-[-410px] border-[1px] border-[#c5c5c5]"></div>}
              <p className="px-[15px]">19%</p>
              {showZoomOptions ? 
                <ButtonIconHover exec={handleShowZoomOption} icon={"arrow_drop_up"}/> : 
                <ButtonIconHover exec={handleShowZoomOption} icon={"arrow_drop_down"}/>
              }
            </div>
            <ButtonIconHover icon={"remove"}/>
            <ButtonIconHover icon={"pan_tool"}/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page