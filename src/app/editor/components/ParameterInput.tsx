import { useState, useEffect } from "react";

const ParameterInput = ({title="", field="", id,  data=0, updateImage, unit=""}) => {
  const [val, setVal] = useState(data);

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.preventDefault();

    // Determine scroll direction and step amount
    const delta = Math.sign(e.deltaY); // -1 (up) or 1 (down)
    const step = 0.1; // Adjust this for larger/smaller increments

    // Calculate new value with 2 decimal places
    const newValue = parseFloat((val - delta * step).toFixed(2));

    // Update the state
    handleValueChange(newValue)
    setVal(newValue);
  };

  const handleValueChange = (value:number) => {
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
          <input 
            value={val?Number(val).toFixed(2):0.00} 
            onChange={(e) => handleValueChange(Number(e.target.value))} 
            onWheel={handleWheel}
            className="w-[70%] h-full bg-[white] border-r-[1px]  border-[#c5c5c5] pl-2"/>
          <div className="w-[30%] h-full bg-gray-200 flex justify-center items-center">{unit}</div>
        </div>
      </div>
  );
}

export default ParameterInput;