import { ButtonIconHoverType } from "@/types/ButtonIconHoverType";

const ButtonIconHover = ({exec, icon}: ButtonIconHoverType) => {
  return (<span onClick={() => exec()} className="material-symbols-outlined cursor-pointer border-[1px] border-[#c5c5c500] sticky hover:border-[#c5c5c5] rounded-md  p-[2px]">
  {icon}
</span>)
}

export default ButtonIconHover;