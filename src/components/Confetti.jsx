import { useMemo } from 'react';

const COLORS = ['#FF2E88', '#FF6FB5', '#FF9CCB', '#FFD1E6', '#FFFFFF', '#FFD86B'];

export default function Confetti({ burstKey = 0, count = 80 }) {
  const pieces = useMemo(() => {
    if (!burstKey) return [];
    return Array.from({ length: count }, (_, index) => ({
      id: `${burstKey}-${index}`,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 2.8 + Math.random() * 2.4,
      size: 6 + Math.random() * 9,
      color: COLORS[index % COLORS.length],
      drift: (Math.random() - 0.5) * 260,
      spin: `${Math.round((Math.random() - 0.5) * 1400)}deg`,
      round: index % 4 === 0,
    }));
  }, [burstKey, count]);

  if (!pieces.length) return null;

  return (
    <div className="confetti-layer" aria-hidden="true">
      {pieces.map((piece) => (
        <i
          key={piece.id}
          className={piece.round ? 'confetti-piece round' : 'confetti-piece'}
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size * (piece.round ? 1 : 1.7)}px`,
            background: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            '--drift': `${piece.drift}px`,
            '--spin': piece.spin,
          }}
        />
      ))}
    </div>
  );
}
