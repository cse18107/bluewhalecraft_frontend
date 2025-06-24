import Image from "next/image";
import ParameterInput from "./ParameterInput";
import { useState } from "react";
import useImageStore from "@/store/image/ImageStore";

const Layers = ({imageProp}) => {
  const [imgProps, setImgProps] = useState({height: 0, width: 0});
  const updateImage = useImageStore((state) => state.updateImage)
  // useEffect(() => {
    
  // }, [imageProp])
  
  return (
  <div className="flex flex-col gap-3 border-[1px] border-[#c5c5c5] rounded-md py-4 px-5 cursor-pointer mb-2">
    <div className="flex items-center justify-between w-full gap-1">
      <Image src={imageProp?.url} alt={"snake-image"} width={40} height={100} className="w-[55px] h-[55px] object-contain"/>
      <div className="h-full">
        <p className="text-[14px] font-bold">{imageProp.title}</p>
        <p className="text-[12px] font-semibold">Resolution will be enhanced</p>
        <div className="flex gap-2">
          <p className="text-[14px] font-semibold">{"(56 DPI -> 300 DPI)"}</p>
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
      <ParameterInput title={"Width"} field={"scaledWidth"} id={imageProp?.id} data={imageProp?.scaledWidth} updateImage={updateImage} unit={"In"}/>
      <ParameterInput title={"Height"} field={"scaledHeight"} id={imageProp?.id} data={imageProp?.scaledHeight} updateImage={updateImage} unit={"In"}/>
        <ParameterInput title={"Rotate"} field={"rotation"} id={imageProp?.id} data={imageProp?.rotation || 0} updateImage={updateImage} unit={"deg"}/>
      <ParameterInput title={"Scale"} id={imageProp?.id} data={imageProp?.scale || 0} updateImage={updateImage} unit={"%"}/>
        <ParameterInput title={"Position left"} field={"leftPosition"} id={imageProp?.id} data={imageProp?.leftPosition || 0} updateImage={updateImage} unit={"%"}/>
      <ParameterInput title={"Position top"} field={"topPosition"} id={imageProp?.id} data={imageProp?.topPosition || 0} updateImage={updateImage} unit={"%"}/>
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

export default Layers;