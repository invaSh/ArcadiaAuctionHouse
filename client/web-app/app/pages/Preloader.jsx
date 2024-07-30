import React from 'react';
import Lottie from 'react-lottie';
import load from '../components/lottie/Preload.json';

function Preloader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: load,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
}

export default Preloader;
