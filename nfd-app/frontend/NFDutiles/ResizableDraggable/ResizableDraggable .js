/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import './ResizableDraggable.scss';

const ResizableDraggable = ({ children }) => {
  const containerRef = useRef(null);

  const onMouseDown = (e) => {
    const container = containerRef.current;
    const offsetX = e.clientX - container.offsetLeft;
    const offsetY = e.clientY - container.offsetTop;

    const onMouseMove = (e) => {
      container.style.left = `${e.clientX - offsetX}px`;
      container.style.top = `${e.clientY - offsetY}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onResizeMouseDown = (e) => {
    e.stopPropagation();
    const container = containerRef.current;
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = container.offsetWidth;
    const startHeight = container.offsetHeight;

    const onMouseMove = (e) => {
      container.style.width = `${startWidth + e.clientX - startX}px`;
      container.style.height = `${startHeight + e.clientY - startY}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className="resizable-draggable-container"
      onMouseDown={onMouseDown}
    >
      {children}
    
      <div
        className="resize-handle"
        onMouseDown={onResizeMouseDown}
        
      /> <i className="fas fa-arrows-alt"></i>
    </div>
  );
};

export default ResizableDraggable;
