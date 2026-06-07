import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useInView } from "framer-motion";

/**
 * LazyCanvas Component
 * Wraps the @react-three/fiber Canvas component and only mounts it when
 * it is close to entering the viewport (within 200px).
 * When scrolled out of view, it unmounts the canvas to free up WebGL contexts
 * and GPU memory, solving page performance issues.
 */
const LazyCanvas = React.forwardRef(({ children, style, className, ...props }, ref) => {
  const containerRef = useRef(null);
  
  // Use IntersectionObserver via framer-motion's useInView
  // margin: "200px 0px" triggers mounting 200px before the element scrolls into view
  const isInView = useInView(containerRef, { margin: "200px 0px" });

  return (
    <div 
      ref={containerRef} 
      style={style} 
      className={`${className || ""} w-full h-full relative`}
      aria-hidden="true" // Decorative WebGL elements should be ignored by screen readers
    >
      {isInView ? (
        <Canvas ref={ref} {...props}>
          {children}
        </Canvas>
      ) : null}
    </div>
  );
});

LazyCanvas.displayName = "LazyCanvas";

export default LazyCanvas;
