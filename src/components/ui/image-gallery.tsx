import { cn } from "@/lib/utils";

type ImageGalleryProps = {
  images: ReadonlyArray<{ src: string; alt: string }>;
  className?: string;
};

export default function ImageGallery({ images, className }: ImageGalleryProps) {
  return (
    <div
      role="region"
      aria-label="Photo gallery"
      className={cn("mx-auto w-full max-w-5xl overflow-x-auto px-1 py-2", className)}
    >
      <div className="flex h-[400px] min-w-[640px] items-center gap-2">
        {images.map((image) => (
          <div
            key={image.src}
            tabIndex={0}
            role="group"
            aria-label={image.alt}
            className="relative h-full min-w-0 flex-1 overflow-hidden rounded-lg transition-[flex-grow] duration-500 hover:grow-[5] focus:grow-[5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 motion-reduce:transition-none"
          >
            <img
              className="h-full w-full object-cover object-center"
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
