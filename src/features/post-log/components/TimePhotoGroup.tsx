import PhotoItem from "./PhotoItem";

interface Photo {
  id: number;
  src?: string;
  likeCount?: number;
}

interface TimePhotoGroupProps {
  time: string;
  photos: Photo[];
  onLike?: (id: number) => void;
  onClick?: () => void;
}

export default function TimePhotoGroup({ time, photos, onLike, onClick }: TimePhotoGroupProps) {
  return (
    <div className="flex flex-col gap-[10px]">
      <p className="pretendard-m-15 text-main-black">{time}</p>
      <div className="flex gap-[8px]">
        {photos.map((photo) => (
          <PhotoItem
            key={photo.id}
            src={photo.src}
            likeCount={photo.likeCount}
            onLike={() => onLike?.(photo.id)}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}
