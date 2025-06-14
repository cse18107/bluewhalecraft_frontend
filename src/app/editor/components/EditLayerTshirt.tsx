import Layers from "./Layers";
import useImageStore from "@/store/image/ImageStore";

const EditLayerTshirt = () => {
  const images = useImageStore((state) => state.images);
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
        {images.map((image, index) => {
          return (
            <Layers key={index} imageProp={images[index]}/>
          )
        })}
      </div>
    </div>
  );
}

export default EditLayerTshirt;