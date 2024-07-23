//app/components/FloatingShape.js
import { useEffect, useRef } from "react";
import styles from "./FloatingShapes.module.css";

const FloatingShapes = () => {
  const shapesContainerRef = useRef(null);

  useEffect(() => {
    const shapesContainer = shapesContainerRef.current;
    const shapesCount = 20;
    const shapes = [];

    for (let i = 0; i < shapesCount; i++) {
      const shape = document.createElement("div");
      shape.classList.add(styles.shape);

      shape.style.left = `${Math.random() * 100}%`;
      shape.style.animationDelay = `${Math.random() * 5}s`;
      shape.style.animationDuration = `${Math.random() * 10 + 5}s`;

      shapesContainer.appendChild(shape);
      shapes.push(shape);
    }

    return () => {
      shapes.forEach((shape) => {
        if (shapesContainer && shapesContainer.contains(shape)) {
          shapesContainer.removeChild(shape);
        }
      });
    };
  }, []);

  return <div className={styles.shapes} ref={shapesContainerRef}></div>;
};

export default FloatingShapes;
