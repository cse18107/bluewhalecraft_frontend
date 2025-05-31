'use client'
import { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Image, Group, Transformer } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';

const CLIP_RECT = { x: 732, y: 240, width: 200, height: 250 };
type EditableImageType = {
  handleImageEditOptions: any,
  imageUrls: [string]
}

const ImageLayers = ({ imageRef, imageUrl, handleImageEditOptions, isSelected, onSelect }) => {
  const [image] = useImage(imageUrl);
  return (
    <Image
    ref={imageRef}
    onMouseDown={(e) => {
      onSelect();
      handleImageEditOptions();
      e.cancelBubble = true; // Prevent event from reaching stage
    }}
    image={image}
    x={CLIP_RECT.x}
    y={CLIP_RECT.y}
    draggable
    alt='designs'
    width={CLIP_RECT.width}
    height={CLIP_RECT.height}
    perfectDrawEnabled={false}
    shadowEnabled={isSelected}
    shadowColor="rgba(0,161,255,0.5)"
    shadowBlur={10}
    />
  );
}
const EditableImage = ({ handleImageEditOptions, imageUrls }: EditableImageType) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const imageRefs = useRef<(Konva.Image | null)[]>([]);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (transformerRef.current) {
      // Filter out null refs and get only selected images
      const nodes = selectedIds
        .map(id => imageRefs.current[id])
        .filter(node => node !== null) as Konva.Image[];
      
      transformerRef.current.nodes(nodes);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedIds, imageUrls]);

  const handleSelect = (index: number, e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e && e.evt && e.evt.shiftKey) {
      // Shift-click: multi-select
      setSelectedIds(prev => 
        prev.includes(index) 
          ? prev.filter(id => id !== index) 
          : [...prev, index]
      );
    } else {
      // Regular click: single select
      setSelectedIds(prev => prev.includes(index) ? [] : [index]);
    }
  };

  // Click on empty space to deselect all
  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setSelectedIds([]);
    }
  };
  return (
    <>
      <Rect {...CLIP_RECT} stroke="black" dash={[10, 5]} onClick={handleStageClick}/>
       {imageUrls && (
        <Group
          clipX={CLIP_RECT.x}
          clipY={CLIP_RECT.y}
          clipWidth={CLIP_RECT.width}
          clipHeight={CLIP_RECT.height}
          onClick={handleStageClick}
        >
          {imageUrls.map((image, index) => {
             return <ImageLayers  
                key={index}
                imageRef={(el) => (imageRefs.current[index] = el)}
                imageUrl={image}
                handleImageEditOptions={handleImageEditOptions}
                isSelected={selectedIds.includes(index)}
                onSelect={(e) => handleSelect(index, e)}
              />
          })}
        </Group>)}
        {imageUrls && (
          <Transformer
           ref={transformerRef}
           onMouseDown={() => handleImageEditOptions()}
           rotateEnabled
           anchorStroke='green'
           draggable
           borderStrokeWidth={0.5}
           anchorCornerRadius={100}
           stroke='green'
           rotateLineVisible={false}
           enabledAnchors={['top-left',  'top-right', 'bottom-left', 'bottom-right']}
           boundBoxFunc={(oldBox, newBox) => {
             if (newBox.width < 50 || newBox.height < 50) return oldBox;
             return newBox;
           }}
          />
        )}   
      </>

  );
};

const CropTool = () => {
  const imageUrl = './snake-1.png';
  const [image] = useImage(imageUrl);
  const imageRef = useRef<Konva.Image>(null);
  const cropRectRef = useRef<Konva.Rect>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const CLIP_RECT = { x: 732, y: 240, width: 200, height: 250 };
  const [crop, setCrop] = useState({ x: 732, y: 240, width: 200, height: 250 });

  useEffect(() => {
    if (transformerRef.current && cropRectRef.current) {
      transformerRef.current.nodes([cropRectRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [image]);

  const updateCrop = () => {
    if (cropRectRef.current) {
      const node = cropRectRef.current;
      const newCrop = {
        x: node.x(),
        y: node.y(),
        width: node.width() * node.scaleX(),
        height: node.height() * node.scaleY(),
      };
      node.scaleX(1);
      node.scaleY(1);
      setCrop(newCrop);
    }
  };

  return (
      <>
      <Rect {...CLIP_RECT} stroke="black" dash={[10, 5]} />
        {image && (
          <Group
            clipX={crop.x}
            clipY={crop.y}
            clipWidth={crop.width}
            clipHeight={crop.height}
          >
            <Image 
              ref={imageRef}
              alt="design"
              image={image} 
              x={CLIP_RECT.x} 
              y={CLIP_RECT.y} 
              width={CLIP_RECT.width}
              height={CLIP_RECT.height}
              />
          </Group>
        )}

        {/* Draw Crop Area Rectangle */}
        <Rect
          ref={cropRectRef}
          {...crop}
          stroke="red"
          strokeWidth={1}
          draggable
          dragBoundFunc={(pos) => {
            const x = Math.max(CLIP_RECT.x, Math.min(pos.x, CLIP_RECT.x + CLIP_RECT.width - crop.width));
            const y = Math.max(CLIP_RECT.y, Math.min(pos.y, CLIP_RECT.y + CLIP_RECT.height - crop.height));
            return { x, y };
          }}
          onDragEnd={updateCrop}
          onTransformEnd={updateCrop}
        />

        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 50 || newBox.height < 50) return oldBox;
            return newBox;
          }}
          rotateEnabled={false}
          enabledAnchors={['top-left', 'top-right', 'top-center', 'middle-left', 'middle-right', 'bottom-left','bottom-center', 'bottom-right']}
        />
        
      </>

  );
};


const KonvaCanvas = ({handleImageEditOptions, images}: any) => {
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





