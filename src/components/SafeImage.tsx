import { useEffect, useState } from 'react';
import { Layers } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'lazy' | 'eager';
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  loading,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#ECE8E1] text-[#57534E] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Layers className="w-8 h-8 mb-2 text-[#B85D2B]" aria-hidden="true" />
        <span className="text-sm font-medium text-[#1C1B19]">{fallbackTitle || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
