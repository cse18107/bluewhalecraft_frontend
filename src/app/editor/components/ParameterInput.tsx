import { useState, useEffect } from "react";

const ParameterInput = ({title, field="", id,  data=0, updateImage, unit}) => {
  const [val, setVal] = useState(data);

  const handleValueChange = (value) => {
    setVal(value);
    updateImage(id, {[field]: value*1})
  }
  useEffect(() => {
    setVal(data);
  },[data])
  return (
    <div className="flex flex-col w-full gap-1 py-2">
        <p>{title}</p>
        <div className="flex w-[100%] h-[40px] border-[1px]  border-[#c5c5c5]">
          <input value={val} onChange={(e) => handleValueChange(e.target.value)} className="w-[70%] h-full bg-[white] border-r-[1px]  border-[#c5c5c5] pl-2"/>
          <div className="w-[30%] h-full bg-gray-200 flex justify-center items-center">{unit}</div>
        </div>
      </div>
  );
}

export default ParameterInput;