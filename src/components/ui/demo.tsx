import ImageGallery from "@/components/ui/image-gallery";
import { mediaPhotos } from "@/lib/media";

export default function DemoOne() {
  return (
    <ImageGallery
      images={mediaPhotos.map((photo) => ({ src: photo.imageUrl, alt: photo.title }))}
    />
  );
}
