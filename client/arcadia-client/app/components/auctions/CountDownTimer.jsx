"use client";
import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span>Auction Ended</span>;
  } else {
    return <span>{days}d {hours}h {minutes}m {seconds}s</span>;
  }
};

export function CountDownTimer({ auctionEnd }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }

  return <Countdown date={auctionEnd} renderer={renderer} />;
}
