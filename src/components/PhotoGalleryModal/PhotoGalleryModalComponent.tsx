import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import AlbumComponent from "../Album/AlbumComponent";
import PhotoComponent from "../Photo/PhotoComponent";
import API_BASE_URL from "../../utils/apiConfig";
import "./PhotoGalleryModalComponent.css";

interface PhotoGalleryModalProps {
  show: boolean;
  handleClose: () => void;
  userId: number;
  userName: string;
}

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface Photo {
  id: number;
  thumbnailUrl: string;
}

const PhotoGalleryModalComponent: React.FC<PhotoGalleryModalProps> = ({
  show,
  handleClose,
  userId,
  userName,
}) => {
  //Set state variables
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const photosPerPage = 9;
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  //fetch Albums against userId
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/albums?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setAlbums(data);
          if (data.length > 0) {
            // Select the first album by default
            setSelectedAlbum(data[0]);
          }
        } else {
          console.error("Failed to fetch albums");
        }
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    if (show) {
      fetchAlbums();
    }
  }, [show, userId]);

  //fetch Photos based against AlbumId
  useEffect(() => {
    if (selectedAlbum) {
      const fetchPhotos = async () => {
        try {
          const response = await fetch(
            `${API_BASE_URL}/photos?albumId=${selectedAlbum.id}`
          );
          if (response.ok) {
            const data = await response.json();
            setPhotos(data);
          } else {
            console.error("Failed to fetch photos");
          }
        } catch (error) {
          console.error("Error fetching photos:", error);
        }
      };

      fetchPhotos();
    }
  }, [selectedAlbum]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{userName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col sm={4}>
            <h4>Album List</h4>
            {/* Album component called here */}
            <AlbumComponent
              albums={albums}
              setSelectedAlbum={setSelectedAlbum}
              selectedAlbumId={selectedAlbum?.id || null}
            />
          </Col>

          <Col sm={8} className="photo-gallery-container">
            {selectedAlbum && (
              <>
                <div className="row">
                  <h4>All Photos</h4>
                  {/* Photo component called here */}
                  <PhotoComponent photos={currentPhotos} />
                </div>

                <div className="d-flex justify-content-between pagination-buttons">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={indexOfLastPhoto >= photos.length}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PhotoGalleryModalComponent;
