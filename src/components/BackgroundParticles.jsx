import React, { useEffect, useRef } from 'react';

export const BackgroundParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedY: -(Math.random() * 0.6 + 0.2),
      speedX: Math.sin(Math.random() * Math.PI * 2) * 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.02 + 0.005,
      isHeart: Math.random() > 0.6
    }));

    const drawHeart = (x, y, size, opacity) => {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = `rgba(244, 63, 94, ${opacity})`;
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      ctx.bezierCurveTo(
        x, y, 
        x - size / 2, y, 
        x - size / 2, y + topCurveHeight
      );
      ctx.bezierCurveTo(
        x - size / 2, y + (size + topCurveHeight) / 2, 
        x, y + size, 
        x, y + size
      );
      ctx.bezierCurveTo(
        x, y + size, 
        x + size / 2, y + (size + topCurveHeight) / 2, 
        x + size / 2, y + topCurveHeight
      );
      ctx.bezierCurveTo(
        x + size / 2, y, 
        x, y, 
        x, y + topCurveHeight
      );
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += Math.sin(Date.now() * p.pulse) * 0.005;

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }

        if (p.isHeart) {
          drawHeart(p.x, p.y, p.size * 3, Math.max(0.1, Math.min(0.8, p.opacity)));
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 113, 133, ${Math.max(0.1, Math.min(0.7, p.opacity))})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#f43f5e';
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};