'use client'
import { useEffect, useState } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';
import useImageStore from '@/store/image/ImageStore';

const CLIP_RECT = { x: 732, y: 240, width: 200, height: 284 }; 
const DPI = 16.66; 

let originalWidth: number;
let originalHeight: number;

const ImageLayers = ({ imageRef, imageObject, handleImageEditOptions, isSelected, onSelect }) => {
  const [image] = useImage(imageObject.url);
  if(!originalHeight || !originalWidth) {
    originalHeight = imageObject.height;
    originalWidth = imageObject.width;
  }
  // console.log("complete image ---> ",imageObject)
  const updateImage = useImageStore((state) => state.updateImage)
  const [metrics, setMetrics] = useState({
    scaledWidth: imageObject.scaledWidth,
    scaledHeight: imageObject.scaledHeight,
    topPosition: imageObject.topPosition,
    leftPosition: imageObject.leftPosition,
    rotation: imageObject.rotation,
    scale: imageObject.scale,

  });
  const handleTransform = (e) => {
    const node = e.target;
    const rect = CLIP_RECT;
    const updatedProperties = { ...metrics };
    console.log("Scale ---> ", node.scale());

    // Current dimensions after scaling
    const currentWidth = node.width() * node.scaleX();
    const currentHeight = node.height() * node.scaleY();
    const scaleXPercent = (currentWidth / originalWidth) * 100;
    const scaleYPercent = (currentHeight / originalHeight) * 100;

    // Take the average for a single scale value (or choose one if uniform scaling is expected)
    const scalePercent = (scaleXPercent + scaleYPercent) / 2;

    if (metrics.rotation !== node.rotation()){
      updatedProperties.rotation= node.rotation() ;
      setMetrics({
        ...updatedProperties
      });
      return ;
    }
    
    // Calculate dimensions in inches
    const widthInches = (node.width() * node.scaleX()) / DPI;
    const heightInches = (node.height() * node.scaleY()) / DPI;
    
    // Calculate scale percentages (assuming initial scale is 100%)
    if(metrics.scaledWidth !== widthInches) {
      updatedProperties.scaledWidth= widthInches;
    }
    if(metrics.scaledHeight !== heightInches) {
      updatedProperties.scaledHeight = heightInches
    }


    setMetrics({
      ...updatedProperties,
      scale: scalePercent
    });
  };

  const handlePositionChange = (e) => {
    const node = e.target;
    const topPosition = node.x();
    const leftPosition = node.y();
    const updatedProperties = { ...metrics };
    if (metrics.topPosition !== topPosition) {
      updatedProperties.topPosition = topPosition;
    }
    if (metrics.leftPosition !== leftPosition) {
      updatedProperties.leftPosition = leftPosition
    }
    setMetrics({
      ...updatedProperties
    });
  }

  const updateGlobalStateImage = (e) => {
    console.log("Transform ends")
    updateImage(e.target.attrs.alt,{...metrics});
  }

  useEffect(() => {
    setMetrics({
      scaledWidth: imageObject.scaledWidth,
      scaledHeight: imageObject.scaledHeight,
      topPosition: imageObject.topPosition,
      leftPosition: imageObject.leftPosition,
      rotation: imageObject.rotation,
      scale: imageObject.scale
    })

  },[imageObject])

  return (
    <Image
    ref={imageRef}
    onMouseDown={(e) => {
      onSelect();
      handleImageEditOptions();
      e.cancelBubble = true; // Prevent event from reaching stage
    }}
    image={image}
    y={metrics.leftPosition}
    x={metrics.topPosition}
    draggable
    alt={imageObject.id}
    scale={metrics.scale}
    width={metrics.scaledWidth * DPI }
    height={metrics.scaledHeight * DPI}
    rotation={metrics.rotation}
    perfectDrawEnabled={false}
    shadowEnabled={isSelected}
    shadowColor="rgba(0,161,255,0.5)"
    shadowBlur={10}
    onTransform={handleTransform}
    onDragMove={handlePositionChange}
    onDragEnd={updateGlobalStateImage}
    // onRotateEnd={(e) => console.log(e.target.node.x())}
    onTransformEnd={updateGlobalStateImage}
    />
  );
}

export default ImageLayers