import React, { useState, useRef } from "react";
import { clamp } from "./utils";

function DragBar({
  handleMouseDown,
  handleTouchStart,
}: {
  handleMouseDown: { (event: React.MouseEvent<HTMLDivElement>): void };
  handleTouchStart: { (event: React.TouchEvent<HTMLDivElement>): void };
}) {
  return (
    <div
      style={{
        position: "sticky",
        top: "1em",
        height: "0.5em",
        width: "10em",
        cursor: "ns-resize",
        background: "#aaaaaa",
        margin: "1em auto",
        borderRadius: "1em",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    />
  );
}

function VerticalResizable({
  width = "100%", // Fixed width
  initialHeight = "30vh",
  children,
  ...props
}: {
  width?: string;
  initialHeight?: string;
  children?: React.ReactNode;
}) {
  const MAX_HEIGHT = screen.height - 200;
  const MIN_HEIGHT = 200;
  const [height, setHeight] = useState(initialHeight); // Initial height
  const draggingRef = useRef<HTMLDivElement>(null);
  const lastYRef = useRef(0);

  /* Handle laptop webpage event */
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    // Record mouse pointer current Y position
    lastYRef.current = event.clientY;

    // Add listeners to window so the event applies to the whole page
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    // Prevent text highlight when dragging
    event.preventDefault();

    if (draggingRef.current) {
      const delta = lastYRef.current - event.clientY;
      const componentCurrentHeight = draggingRef.current.clientHeight;
      const newHeight = componentCurrentHeight + delta;
      lastYRef.current = event.clientY;

      setHeight(`${clamp(newHeight, MIN_HEIGHT, MAX_HEIGHT)}px`);
    }
  };

  // Clean up listeners
  const handleMouseUp = (event: MouseEvent) => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  /* Handle mobile webpage event */
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    // Record mouse pointer current Y position
    lastYRef.current = event?.touches?.[0]?.clientY;

    // Add listeners to window so the event applies to the whole page

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault();
    if (draggingRef.current) {
      const delta = lastYRef.current - event?.touches?.[0]?.clientY;
      const componentCurrentHeight = draggingRef.current.clientHeight;
      const newHeight = componentCurrentHeight + delta;
      lastYRef.current = event?.touches?.[0]?.clientY;

      setHeight(`${clamp(newHeight, MIN_HEIGHT, MAX_HEIGHT)}px`);
    }
  };

  const handleTouchEnd = (event: TouchEvent) => {
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
  };

  return (
    <div
      ref={draggingRef}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: height,
        width: width,
        background: "#f5f5f5",
        overflow: "hidden",
        overflowY: "scroll",
      }}
      {...props}
    >
      <DragBar
        handleMouseDown={handleMouseDown}
        handleTouchStart={handleTouchStart}
      />
      {children}
    </div>
  );
}

export default VerticalResizable;
