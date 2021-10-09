import React, { useEffect, useState } from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface IResizableProps {
  direction: ResizableDirection;
};

export enum ResizableDirection {
  horizontal = "horizontal",
  vertical = "vertical"
};

type resizablePropsParams = {
  direction: ResizableDirection;
  innerWidth: number;
  innerHeight: number;
  width: number;
  setWidth: Function;
};

const GetResizableProps = ({ direction, innerWidth, innerHeight, width, setWidth }: resizablePropsParams): ResizableBoxProps => {
  let resizableProps: ResizableBoxProps;
  if (direction === ResizableDirection.horizontal) {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.90, Infinity],
      height: Infinity,
      width,
      resizeHandles: ['e'],
      onResizeStop: (e, data) => {
        setWidth(data.size.width);
      }
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 600,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }
  return resizableProps;
}

const Resizable: React.FC<IResizableProps> = ({ direction, children }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  const resizableProps: ResizableBoxProps = GetResizableProps({ direction, innerWidth, innerHeight, width, setWidth });

  useEffect(() => {
    const resizes = fromEvent(window, 'resize');
    const result = resizes.pipe(debounceTime(150));

    result.subscribe(x => {
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);
      if (window.innerWidth * 0.75 < width) {
        setWidth(window.innerWidth * 0.75);
      }
    });

    return () => {
    }

  }, [width]);

  return (<ResizableBox {...resizableProps} > {children} </ResizableBox>)
}

export default Resizable;