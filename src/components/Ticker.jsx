import { siteData as data } from '../data/siteData';

export default function Ticker() {
  const items = data.tickerItems?.length
    ? data.tickerItems
    : [
        `HAPPY BIRTHDAY ${data.name.toUpperCase()}`,
        `TURNING ${data.age} ✦`,
        data.dateText.toUpperCase(),
        'MAKE A WISH',
        'BIRTHDAY SURPRISE',
      ];

  const row = [...items, ...items, ...items];

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[...row, ...row].map((item, index) => (
          <span key={`${item}-${index}`}>{item}<b>♥</b></span>
        ))}
      </div>
    </div>
  );
}
