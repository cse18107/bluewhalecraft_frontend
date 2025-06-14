import { ButtonBGIconHoverType } from "@/types/ButtonBGIconHoverType"
import React from "react";

const ButtonBGIconHover: React.FC<ButtonBGIconHoverType> = ({setShowEditLayer, icon}) => {
  if(!setShowEditLayer) return;
  return (<div onClick={() => setShowEditLayer(value => !value)} className=" cursor-pointer border-[1px] 
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

export default ButtonBGIconHover;