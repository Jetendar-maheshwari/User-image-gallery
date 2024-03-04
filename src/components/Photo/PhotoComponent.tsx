import React from "react";
import { Col, Row, Card } from "react-bootstrap";

interface Photo {
  id: number;
  thumbnailUrl: string;
}

interface PhotoProps {
  photos: Photo[];
}

const PhotoComponent: React.FC<PhotoProps> = ({ photos }) => {
  return (
    <Row>
      {photos.map((photo, index) => (
        <Col key={photo.id} md={4} className="mb-3">
          <Card>
            <Card.Img
              variant="top"
              src={photo.thumbnailUrl}
              alt={`Photo ${index + 1}`}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PhotoComponent;
