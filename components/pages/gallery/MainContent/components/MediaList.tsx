/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect, useRef } from 'react';
import { useGalleryContext } from '../GalleryContext';
import MediaCard from './MediaCard';
import Modal from '@/components/Shared/Modal';
import ImageModal from './ImageModal';
import { Media } from '@/components/types';

const mediaListStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

interface MediaListProps {
  galleryId: string;
}

const MediaList = ({ galleryId }: MediaListProps) => {
  const { media, fetchGalleryFiles, hasMore } = useGalleryContext() as {
    media: Media[];
    fetchGalleryFiles: (galleryId: string, page?: number, limit?: number, reset?: boolean) => Promise<void>;
    hasMore: boolean;
  };

  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadInitialMedia = async () => {
      setIsFetching(true);
      await fetchGalleryFiles(galleryId, 1, 25, true); // Reset media for new gallery
      setCurrentPage(1);
      setIsFetching(false);
    };
    loadInitialMedia();
  }, [galleryId]);

  const loadMoreMedia = async () => {
    if (!hasMore || isFetching) return;

    setIsFetching(true);

    // Introduce a delay of 1 second
    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      await fetchGalleryFiles(galleryId, currentPage + 1);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error loading more media:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMoreMedia();
      },
      { threshold: 1.0 }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [currentPage, hasMore, isFetching]);

  return (
    <>
      <div css={mediaListStyle}>
        {media.map((item) => (
          <MediaCard key={item._id} media={item} onClick={() => setSelectedMedia(item)} />
        ))}
      </div>
      <div ref={observerRef} css={{ height: '1px' }} />
      {isFetching && <div>Loading more...</div>}
      <Modal isOpen={!!selectedMedia} onClose={() => setSelectedMedia(null)} maxWidth="90vw" maxHeight="90vh">
        {selectedMedia && (
          <ImageModal
            galleryId={selectedMedia.gallery}
            fileName={selectedMedia.fileName}
          />
        )}
      </Modal>
    </>
  );
};

export default MediaList;
