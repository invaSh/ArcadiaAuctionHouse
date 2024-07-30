"use client"
import React, { useState, useEffect } from "react";
import Preloader from "../pages/Preloader";

const PageWrapper = ({ children, setLoadingState }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      setLoadingState(false); 
    }, 1000); 

    return () => {
      clearTimeout(timeout);
      setLoadingState(true); 
    };
  }, [setLoadingState]);

  return loading ? <Preloader /> : children;
};

export default PageWrapper;
