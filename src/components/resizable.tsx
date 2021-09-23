import React from 'react'
import { ResizableBox } from 'react-resizable';
import './resizable.css';

interface IResizableProps {
    direction: ResizableDirection;
};

export enum ResizableDirection {
    horizontal = "horizontal",
    vertical = "horizontal"
};

const Resizable: React.FC<IResizableProps> = ({ direction, children }) => {
    return (
        <ResizableBox height={300} width={Infinity} resizeHandles={['s']} maxConstraints={[Infinity, window.innerHeight * 0.9]}
        minConstraints={[Infinity, 100]}
        >
            {children}
        </ResizableBox>
    )
}

export default Resizable;
