import React from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface IResizableProps {
  direction: ResizableDirection;
};

export enum ResizableDirection {
  horizontal = "horizontal",
  vertical = "vertical"
};

const Resizable: React.FC<IResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  
  if (direction === ResizableDirection.horizontal) {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.90, Infinity],
      height: Infinity,
      width: window.innerWidth * 0.90,
      resizeHandles: ['e'],
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      height: 600,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return (<ResizableBox {...resizableProps} > {children} </ResizableBox>)
}

export default Resizable;
