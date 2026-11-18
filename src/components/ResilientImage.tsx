import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  loading?: 'eager' | 'lazy';
  aspectClassName?: string;
}

export function ResilientImage({
  src,
  alt,
  caption,
  className = '',
  imgClassName = '',
  loading = 'lazy',
  aspectClassName = 'aspect-[4/3]',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`flex flex-col ${className}`}>
      <div
        className={`relative overflow-hidden bg-[#EAF7F3] border border-[#21495B]/10 ${aspectClassName}`}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            loading={loading}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${imgClassName}`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#EAF7F3] via-[#FFF9EF] to-[#EAF7F3]">
            <ImageOff className="w-7 h-7 text-[#127E79] mb-2" aria-hidden="true" />
            <p className="text-sm font-medium text-[#21495B] max-w-xs">{alt}</p>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-2.5 text-xs text-[#254451]/75 leading-relaxed">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
