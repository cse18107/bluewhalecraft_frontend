'use client'
import { useRef, useEffect, useState } from 'react';
import { Rect, Group, Transformer } from 'react-konva';
import Konva from 'konva';
import useImageStore from '@/store/image/ImageStore';
import ImageLayers from './ImageLayers';

const CLIP_RECT = { x: 732, y: 240, width: 200, height: 284 };

type EditableImageType = {
  handleImageEditOptions: any,
  imageUrls: [string]
}


const EditableImage = ({ handleImageEditOptions }: EditableImageType) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const imageRefs = useRef<(Konva.Image | null)[]>([]);
  const transformerRef = useRef<Konva.Transformer>(null);
  const images = useImageStore((state) => state.images)

  useEffect(() => {
    if (transformerRef.current) {
      // Filter out null refs and get only selected images
      const nodes = selectedIds
        .map(id => imageRefs.current[id])
        .filter(node => node !== null) as Konva.Image[];
      
      transformerRef.current.nodes(nodes);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedIds, images]);

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
       {images && (
        <Group
          clipX={CLIP_RECT.x}
          clipY={CLIP_RECT.y}
          clipWidth={CLIP_RECT.width}
          clipHeight={CLIP_RECT.height}
          onClick={handleStageClick}
        >
          {images.map((image, index) => {
             return <ImageLayers
                key={index}
                imageRef={(el) => (imageRefs.current[index] = el)}
                imageObject={image}
                handleImageEditOptions={handleImageEditOptions}
                isSelected={selectedIds.includes(index)}
                onSelect={(e) => handleSelect(index, e)}
              />
          })}
        </Group>)}
        {images && (
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

export default EditableImage;