import React from 'react';
import Countdown from 'react-countdown';

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span>Auction Ended</span>;
  } else {
    return <span>{days}d {hours}h {minutes}m {seconds}s</span>;
  }
};

export function CountDownTimer({ auctionEnd }) {
  return <Countdown date={auctionEnd} renderer={renderer} />;
}

