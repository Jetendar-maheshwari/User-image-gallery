import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createAlbum } from "../../utils/albumService";

interface NewAlbumModalProps {
  show: boolean;
  handleClose: () => void;
  userId: number;
}

const NewAlbumModalComponent: React.FC<NewAlbumModalProps> = ({
  show,
  handleClose,
  userId,
}) => {
  const [newAlbumTitle, setNewAlbumTitle] = useState<string>("");

  const handleCreateAlbum = () => {
    createAlbum(userId, newAlbumTitle)
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.error("Error creating album:", error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Album</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter album title"
              value={newAlbumTitle}
              onChange={(e) => setNewAlbumTitle(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateAlbum}>
          Create Album
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewAlbumModalComponent;
