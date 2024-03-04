import React from "react";
import { ListGroup } from "react-bootstrap";
import "./AlbumComponent.css";

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface AlbumProps {
  albums: Album[];
  setSelectedAlbum: (album: Album) => void;
  selectedAlbumId: number | null;
}

const AlbumComponent: React.FC<AlbumProps> = ({
  albums,
  setSelectedAlbum,
  selectedAlbumId,
}) => {
  return (
    <ListGroup>
      {albums.map((album) => (
        <ListGroup.Item
          key={album.id}
          className={`album-list-item ${
            selectedAlbumId === album.id ? "active" : ""
          }`}
          onClick={() => setSelectedAlbum(album)}
          action
        >
          {album.title}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default AlbumComponent;
