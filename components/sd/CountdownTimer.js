"use client"
import { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,

  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className='my-4 flex gap-3 items-center justify-start text-center'>
      <p className='py-1 px-2 rounded-md border border-gray-300 text-2xl font-black w-16'>
        {timeLeft.days | 0}
        <span className='block text-sm font-semibold'>Days</span>
      </p>

      <p className='py-1 px-2 rounded-md border border-gray-300 text-2xl font-black w-16'>
        {timeLeft.hours | 0}
        <span className='block text-sm font-semibold'>Hours</span>
      </p>

      <p className='py-1 px-2 rounded-md border border-gray-300 text-2xl font-black w-16'>
        {timeLeft.minutes | 0}
        <span className='block text-sm font-semibold'>Mins</span>
      </p>

      <p className='py-1 px-2 rounded-md border border-gray-300 text-2xl font-black w-16'>
        {timeLeft.seconds | 0}
        <span className='block text-sm font-semibold'>Secs</span>
      </p>
    </div>
  )
}

export default CountdownTimer;