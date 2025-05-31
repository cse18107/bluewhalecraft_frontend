'use client'
import React from 'react';
import LeftBar from './components/LeftBar';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const KonvaCanvas = dynamic(() => import('./components/KonvaCanvas'), { ssr: false });



const Page = () => {
  const [showEditLayer, setShowEditLayer] = React.useState(false);
  const [showZoomOptions, setShowZoomOptions] = React.useState(false);
  const [showImageEditOptions, setShowImageEditOptions] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const handleShowZoomOption = () => {
    setShowZoomOptions((value: any) => !value);
  }
  const handleImageEditOptions = () => {
    setShowImageEditOptions(true);
  }
  return (
    <div className='flex h-screen'>
      <LeftBar setImages={setImages}/>
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
type ButtonIconHoverType ={
  exec?: any,
  icon: string
}
type ButtonBGIconHoverType ={
  setShowEditLayer?: any,
  icon: string
}

const ButtonIconHover = ({exec, icon}: ButtonIconHoverType) => {
  return (<span onClick={() => exec()} className="material-symbols-outlined cursor-pointer border-[1px] border-[#c5c5c500] sticky hover:border-[#c5c5c5] rounded-md  p-[2px]">
  {icon}
</span>)
}

const ButtonBGIconHover = ({setShowEditLayer, icon}: ButtonBGIconHoverType) => {
  return (<div onClick={() => setShowEditLayer((value: any) => !value)} className=" cursor-pointer border-[1px] 
    h-[32.5px] 
    w-[32.5px] 
    flex 
    items-center 
    justify-center 
    border-[#bebebe] 
    bg-[white] 
    hover:border-[#969696] 
    rounded-sm">
      <span className="material-symbols-outlined ">
      {icon}
      </span>
    </div>
  )
}

const EditLayerTshirt = () => {
  return (
    <div className="absolute min-h-[400px] max-h-[770px] overflow-hidden  p-8 w-[450px] bg-[white] border-[1px] border-[#c5c5c5] z-40 top-[65px] right-0">
      <div className="flex justify-between w-full mb-8">
        <p className='text-xl font-bold'>Variants and layers</p>
        <span className="material-symbols-outlined">
          close
        </span>
      </div>
      <div className=" max-h-[640px] overflow-auto">
        <div className="flex justify-between w-full mb-4">
          <p className='text-lg font-semibold'>Variants</p>
        </div>
        <div className="flex justify-between w-full mb-4">
          <p className='text-lg'>Colors</p>
          <div className="border-[1px] text-[14px] font-bold border-[#c5c5c5] rounded-md py-1 px-2 cursor-pointer">
            Select variants
          </div>
        </div>
        <div className="flex w-full gap-2 mb-6">
          <div className="border-[1px]  border-[#c5c5c5] rounded-full p-1 cursor-pointer">
            <div className="p-4 rounded-full bg-[gray]"></div>
          </div>
          <div className="border-[1px]  border-[#c5c5c5] rounded-full p-1 cursor-pointer">
            <div className="p-4 rounded-full bg-[red]"></div>
          </div>
        </div>
        <div className="flex justify-between w-full mb-4">
            Layers
        </div>
        <Layers/>
        <Layers/>
        <Layers/>
        <Layers/>
        <Layers/>
      </div>
    </div>
  );
}

const Layers = () => {
  return (
  <div className="flex flex-col gap-3 border-[1px] border-[#c5c5c5] rounded-md py-4 px-5 cursor-pointer mb-2">
    <div className="flex items-center justify-between w-full gap-1">
      <Image src={"/snake-1.png"} alt={"snake-image"} width={40} height={100} className="w-[55px] h-[55px] object-contain"/>
      <div className="h-full">
        <p className="text-[14px] font-bold">snake-1.png</p>
        <p className="text-[12px] font-semibold">Resolution will be enhanced</p>
        <div className="flex gap-2">
          <p className="text-[14px] font-semibold">(56 DPI -> 300 DPI)</p>
          <span className="material-symbols-outlined">
            info
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <span className="material-symbols-outlined">
          delete
        </span>
        <span className="material-symbols-outlined">
          drag_indicator
        </span>
      </div>
    </div>
    <div className="grid w-full grid-cols-2 gap-x-4">
      <ParameterInput title={"Width"} unit={"In"}/>
      <ParameterInput title={"Height"} unit={"In"}/>
      <ParameterInput title={"Rotate"} unit={"deg"}/>
      <ParameterInput title={"Scale"} unit={"%"}/>
      <ParameterInput title={"Position left"} unit={"%"}/>
      <ParameterInput title={"Position top"} unit={"%"}/>
      <div className="flex w-full py-2">
        <div className="flex w-[33.33%] h-[40px] border-[1px] items-center justify-center border-[#c5c5c5]">
          <span className="material-symbols-outlined">keyboard_tab_rtl</span>
        </div>
        <div className="flex w-[33.33%] h-[40px] border-[1px] items-center justify-center border-[#c5c5c5] ">
          <div className=" rotate-360"><span className="material-symbols-outlined">vertical_align_center</span></div>
        </div>
        <div className="flex w-[33.33%] h-[40px] border-[1px] items-center justify-center border-[#c5c5c5]">
          <span className="material-symbols-outlined">keyboard_tab</span>
        </div>
      </div>
      <div className="flex w-full py-2">
        <div className="flex w-[33.33%] h-[40px] border-[1px] items-center justify-center border-[#c5c5c5]">
          <span className="material-symbols-outlined">vertical_align_top</span>
        </div>
        <div className="flex w-[33.33%] h-[40px] border-[1px] items-center justify-center border-[#c5c5c5]">
          <span className="material-symbols-outlined">vertical_align_center</span>
        </div>
        <div className="flex w-[33.33%] h-[40px] border-[1px] items-center justify-center border-[#c5c5c5]">
          <span className="material-symbols-outlined">vertical_align_bottom</span>
        </div>
      </div>
    </div>
  </div>
  )
}

const ParameterInput = ({title, unit}) => {
  return (
    <div className="flex flex-col w-full gap-1 py-2">
        <p>{title}</p>
        <div className="flex w-[100%] h-[40px] border-[1px]  border-[#c5c5c5]">
          <input className="w-[70%] h-full bg-[white] border-r-[1px]  border-[#c5c5c5]"/>
          <div className="w-[30%] h-full bg-gray-200 flex justify-center items-center">{unit}</div>
        </div>
      </div>
  );
}

export default Page