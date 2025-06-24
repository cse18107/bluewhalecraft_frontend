'use client'
import { useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Image } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import EditableImage from './EditableImage';




const KonvaCanvas = ({handleImageEditOptions,  images}: any) => {
  const width = typeof window !== 'undefined' ? window.innerWidth - 70 : 800;
  const height = typeof window !== 'undefined' ? window.innerHeight - 125 : 600;
  const [image] = useImage('./ts.png');
  const imageUrl = './snake-1.png';
  const stageRef = useRef<Konva.Stage>(null);
  const backgroundRef = useRef<Konva.Rect>(null);

  useEffect(() => {
    if (stageRef.current) {
      const container = stageRef.current.container();
      container.style.backgroundColor = '#F5F5F0';
    }
  }, []);


  const handleDragMove = () => {
    if (backgroundRef.current) {
      backgroundRef.current.absolutePosition({ x: 0, y: 0 });
    }
  };

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if(!stage) return;
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if(!pointer) return ;
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    let direction = e.evt.deltaY > 0 ? 1 : -1;

    if (e.evt.ctrlKey) {
      direction = -direction;
    }

    const scaleBy = 1.01;
    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
  };

  return (
    <div className={`relative h-[${height}px]`}>
      <Stage
        width={width}
        height={height}
        draggable
        ref={stageRef}
        onDragMove={handleDragMove}
        onWheel={handleWheel}
        
      >
        <Layer>
          <Rect
            ref={backgroundRef}
            x={0}
            y={0}
            width={width}
            height={height}
            backgroundColor="#F5F5F0"
            listening={false}
          />
          <Image
            x={width / 3.5}
            y={height / 10}
            image={image}
            alt="red-t"
            width={606}
            height={590} />
            {imageUrl && <EditableImage handleImageEditOptions={handleImageEditOptions} imageUrls={images} />}
            {/* {imageUrl && <CropTool />} */}
        </Layer>
        {/* <CropTool/> */}
      </Stage>
      
      <div className='absolute w-full bottom-[0] h-[60px] bg-transparent  flex items-center justify-center gap-6'>
        <div className='px-[0.6rem] py-[0.3rem] bg-[white] rounded-md border-[1px] border-[#c5c5c5]'>Front</div>
        <div className='px-[0.6rem] py-[0.3rem] bg-[white] rounded-md border-[1px] border-[#c5c5c5]'>Back</div>
        <div className='px-[0.6rem] py-[0.3rem] bg-[white] rounded-md border-[1px] border-[#c5c5c5]'>Collar</div>
      </div>
    </div>
    
  );
};

export default KonvaCanvas;





