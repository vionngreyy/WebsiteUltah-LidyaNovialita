import { Camera, Heart, Sparkles, ZoomIn } from 'lucide-react';
import { siteData as data } from '../../data/siteData';

export default function GallerySection({ gallery, gridLimit = 4, onOpen }) {
  const h = data.sectionHeadings.gallery;
  const visible = gallery.slice(0, gridLimit);
  const hiddenCount = gallery.length - visible.length;

  return (
    <section id="gallery" className="gallery section-pad">
      <div className="gallery-head reveal reveal-left">
        <div>
          <span className="kicker">{h.kicker}</span>
          <h2>{h.top}<br /><em>{h.emphasis}</em></h2>
        </div>
        <div className="gallery-spark" aria-hidden="true">
          <i><Sparkles size={18} /></i>
          <b><Camera size={26} /></b>
          <i><Heart size={16} /></i>
        </div>
      </div>

      <div className="masonry-grid" role="list" aria-label="Galeri foto ulang tahun">
        {visible.map((item, index) => (
          <button
            key={item.id}
            className={`masonry-card${index === visible.length - 1 && hiddenCount > 0 ? ' has-more' : ''}`}
            onClick={() => onOpen(index)}
            aria-label={`Buka foto galeri ${item.id}`}
            role="listitem"
          >
            <div className="masonry-frame">
              <img
                src={item.src}
                alt={`Galeri ${item.id}`}
                loading="lazy"
                decoding="async"
                width={item.w}
                height={item.h}
              />
              <span className="masonry-hint" aria-hidden="true">
                <ZoomIn size={18} />
                <small>Lihat</small>
              </span>
              {index === visible.length - 1 && hiddenCount > 0 && (
                <span className="gallery-more" aria-hidden="true">+{hiddenCount} foto</span>
              )}
            </div>
            <span className="masonry-index">{String(item.id).padStart(2, '0')}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
