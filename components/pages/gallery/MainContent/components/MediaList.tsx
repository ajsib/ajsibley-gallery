/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
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

  const router = useRouter();
  const { file } = router.query;

  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const isModalClosing = useRef(false); // Prevent race conditions during modal close

  console.log("Component Rendered with Query:", router.query);

  // Load initial media files when the component mounts or galleryId changes
  useEffect(() => {
    const loadInitialMedia = async () => {
      console.log("Fetching initial media for galleryId:", galleryId);
      setIsFetching(true);
      await fetchGalleryFiles(galleryId, 1, 25, true); // Reset media for the new gallery
      setCurrentPage(1);
      setIsFetching(false);
      console.log("Initial media fetched.");
    };
    loadInitialMedia();
  }, [galleryId]);

  // Fetch additional media files when the user scrolls to the bottom
  const loadMoreMedia = async () => {
    if (!hasMore || isFetching) {
      console.log("No more media to fetch or already fetching.");
      return;
    }

    console.log("Fetching more media for page:", currentPage + 1);
    setIsFetching(true);
    await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate delay
    try {
      await fetchGalleryFiles(galleryId, currentPage + 1);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading more media:", error);
    } finally {
      setIsFetching(false);
      console.log("Finished fetching media for page:", currentPage + 1);
    }
  };

  // Observe the scroll container for loading more media
  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    console.log("Setting up IntersectionObserver for infinite scroll.");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMoreMedia();
      },
      { threshold: 1.0 }
    );

    observer.observe(target);

    return () => {
      console.log("Cleaning up IntersectionObserver.");
      observer.disconnect();
    };
  }, [currentPage, hasMore, isFetching]);

  // Handle card click to open the modal
  const handleCardClick = (media: Media) => {
    console.log("Card clicked for media:", media);
    isModalClosing.current = false; // Reset modal closing flag
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, mediaId: media._id },
      },
      undefined,
      { shallow: true }
    );
    console.log("Added mediaId query to router:", { ...router.query, mediaId: media._id });
  };

  // Handle modal close to remove the `file` query
  const handleModalClose = () => {
    console.log("Modal close triggered.");
    isModalClosing.current = true; // Indicate modal is being closed
    const remainingQuery = { ...router.query };
    delete remainingQuery.mediaId; // Remove mediaId directly
    router
      .replace(
        {
          pathname: router.pathname,
          query: remainingQuery,
        },
        undefined,
        { shallow: true }
      )
      .then(() => {
        console.log("File query successfully removed:", remainingQuery);
      })
      .catch((error) => {
        console.error("Error while removing file query:", error);
      });
  };

  // Find the selected media using mediaId
  const selectedMedia = router.query.mediaId
    ? media.find((item) => item._id === router.query.mediaId) || null
    : null;


  useEffect(() => {
    console.log("Selected Media Updated:", selectedMedia);
  }, [selectedMedia]);

  // Prevent modal re-opening during close operation
  useEffect(() => {
    if (isModalClosing.current && !file) {
      console.log("Modal successfully closed, preventing re-trigger.");
      isModalClosing.current = false;
    } else if (file) {
      console.log("File query detected, modal will open.");
    }
  }, [file]);

  return (
    <>
      <div css={mediaListStyle}>
        {media.map((item) => (
          <MediaCard key={item._id} media={item} onClick={() => handleCardClick(item)} />
        ))}
      </div>
      <div ref={observerRef} css={{ height: '2rem' }} />
      {isFetching && <div>Loading more...</div>}
      <Modal
        isOpen={!!router.query.mediaId && !isModalClosing.current}
        onClose={handleModalClose}
        maxWidth="95vw"
        maxHeight="90vh"
      >
        {selectedMedia && (
          <ImageModal
            galleryId={selectedMedia.gallery}
            mediaId={selectedMedia._id}
            fileName={selectedMedia.fileName}
          />
        )}
      </Modal>
    </>
  );
};

export default MediaList;
