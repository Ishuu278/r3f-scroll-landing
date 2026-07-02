import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export const LoadingScreen: React.FC = () => {
  const { active, progress } = useProgress();
  const [shouldRender, setShouldRender] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!active && progress === 100) {
      const fadeTimer = setTimeout(() => setFadeOut(true), 500);
      const removeTimer = setTimeout(() => setShouldRender(false), 1300);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [active, progress]);

  if (!shouldRender) return null;

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`} id="loading-screen">
      <div className="loading-content">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
        <h2 className="loading-title">Loading 3D Dimension</h2>
        <div className="progress-bar-bg">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">{Math.round(progress)}%</p>
      </div>
    </div>
  );
};
