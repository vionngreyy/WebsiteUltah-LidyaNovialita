import { useEffect, useState } from 'react';
import { CakeSlice, Clock3, Sparkles } from 'lucide-react';
import { siteData as data } from '../data/siteData';

function countdownTo(target) {
  if (!target) return null;
  const ms = new Date(target).getTime() - Date.now();
  if (Number.isNaN(ms)) return null;
  if (ms <= 0) return { finished: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    finished: false,
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export default function Countdown({ target }) {
  const [value, setValue] = useState(() => countdownTo(target));

  useEffect(() => {
    if (!target) return undefined;
    const timer = setInterval(() => setValue(countdownTo(target)), 1000);
    return () => clearInterval(timer);
  }, [target]);

  if (!target || !value) {
    return (
      <div className="countdown-pending">
        <Clock3 />
        <div>
          <strong>Menunggu hari yang ditentukan</strong>
          <span>Countdown akan muncul begitu tanggal ulang tahun diisi.</span>
        </div>
      </div>
    );
  }

  if (value.finished) {
    return (
      <div className="countdown-done">
        <span className="countdown-done-icon"><CakeSlice /></span>
        <div>
          <strong>Happy Birthday, {data.name}!</strong>
          <span>Hari ini milikmu. Semoga semua harapan jadi nyata 🎉</span>
        </div>
        <Sparkles className="countdown-done-spark" />
      </div>
    );
  }

  return (
    <div className="countdown-grid">
      {[
        ['Hari', value.days], ['Jam', value.hours], ['Menit', value.minutes], ['Detik', value.seconds],
      ].map(([label, val]) => (
        <div className="countdown-cell" key={label}>
          <strong>{String(val).padStart(2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
