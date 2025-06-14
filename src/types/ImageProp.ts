export type Image = {
  id?: string;
  url?: string;
  title?: string;
  height?: number;
  width?: number;
  scaledWidth?: number;
  scaledHeight?: number;
  topPosition?: number;
  leftPosition?: number;
  rotation?: number;
  scale?: number;
  side?: string;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  pattern?: boolean;
  patternProps?: {
    grid?: boolean;
    brickHorizontal?: boolean;
    brickVertical?: boolean;
    horizontalSpacing?: number;
    verticalSpacing?: number;
    angle?: number;
    horizontalOffset?: number;
    rotationEachHorizontalStep?: number;
    rotationEachVerticalStep?: number;
  }
}