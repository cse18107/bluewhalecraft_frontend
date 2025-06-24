'use client'
import { useRef, useEffect, useState } from 'react';
import { Rect, Image, Group, Transformer } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';



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

export default CropTool;