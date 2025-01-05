import React, { useState, useEffect } from 'react';

const AestheticClock = () => {
  const [time, setTime] = useState(new Date());
  const [particles, setParticles] = useState([]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.5 + 0.1
    }));
    setParticles(newParticles);
  }, []);

  // Format time
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `float ${particle.speed * 5}s infinite linear`,
            transform: `translateY(${Math.sin(time.getTime() / 500) * 20}px)`
          }}
        />
      ))}

      {/* Clock display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="text-6xl font-light tracking-wider mb-6 backdrop-blur-sm bg-white/10 px-12 py-6 rounded-2xl">
          <span className="text-[10rem]">{hours}</span>
          <span className="text-[10rem]">:</span>
          <span className="text-[10rem]">{minutes}</span>
          <span className="text-6xl opacity-75">:{seconds}</span>
        </div>
        
        <div className="text-3xl font-light tracking-widest opacity-75">
          {time.toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
    </div>
  );
};

export default AestheticClock;