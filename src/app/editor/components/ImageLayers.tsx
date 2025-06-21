'use client'
import { useEffect, useState } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';
import useImageStore from '@/store/image/ImageStore';

const CLIP_RECT = { x: 732, y: 240, width: 200, height: 284 }; 
const DPI = 16.66; 


const ImageLayers = ({ imageRef, imageObject, handleImageEditOptions, isSelected, onSelect }) => {
  const [image] = useImage(imageObject.url);
  // console.log("complete image ---> ",imageObject)
  const updateImage = useImageStore((state) => state.updateImage)
  const [metrics, setMetrics] = useState({
    scaledWidth: imageObject.scaledWidth,
    scaledHeight: imageObject.scaledHeight,
    topPosition: imageObject.topPosition,
    leftPosition: imageObject.leftPosition,
    rotation: 0,
    scaleX: 100,
    scaleY: 100
  });
  const handleTransform = (e) => {
    const node = e.target;
    const rect = CLIP_RECT;
    console.log("node -----> ", node.width(), node.height());
    const updatedProperties = {...metrics};
    // Calculate position percentages (0-100)
    const topPosition = ((node.y() - rect.y) / rect.height) * 100;
    const leftPosition = ((node.x() - rect.x) / rect.width) * 100;
    
    // Calculate dimensions in inches
    const widthInches = (node.width() * node.scaleX()) / DPI;
    const heightInches = (node.height() * node.scaleY()) / DPI;
    
    // Calculate scale percentages (assuming initial scale is 100%)
    const scaleX = node.scaleX() * 100;
    const scaleY = node.scaleY() * 100;
    if(metrics.scaledWidth !== widthInches) {
      updatedProperties.scaledWidth= widthInches;
    }
    if(metrics.scaledHeight !== heightInches) {
      updatedProperties.scaledHeight = heightInches
    }

    setMetrics({
      ...updatedProperties
    });
  };

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
      rotation: 0,
      scaleX: 100,
      scaleY: 100
    })

  },[imageObject])

  return (
    <Image
    ref={imageRef}
    onMouseDown={(e) => {
      onSelect();
      console.log(e.target.attrs.alt)
      handleImageEditOptions();
      e.cancelBubble = true; // Prevent event from reaching stage
    }}
    image={image}
    x={imageObject.topPosition}
    y={imageObject.leftPosition}
    draggable
    alt={imageObject.id}
    width={metrics.scaledWidth * DPI }
    height={metrics.scaledHeight * DPI}
    perfectDrawEnabled={false}
    shadowEnabled={isSelected}
    shadowColor="rgba(0,161,255,0.5)"
    shadowBlur={10}
    onTransform={handleTransform}
    // onDragEnd={handleTransform}
    // onRotateEnd={(e) => console.log(e.target)}
    onTransformEnd={updateGlobalStateImage}
    />
  );
}

export default ImageLayers