import { render, screen } from "@testing-library/react";

import AlbumComponent from "./AlbumComponent";

describe("AlbumComponent", () => {
  test("renders AlbumComponent", () => {
    const albums = [
      { userId: 1, id: 1, title: "Album Test 1" },
      { userId: 1, id: 2, title: "Album Test 2" },
    ];
    render(
      <AlbumComponent
        albums={albums}
        setSelectedAlbum={() => {}}
        selectedAlbumId={null}
      />
    );
    expect(screen.getByText("Album Test 1")).toBeInTheDocument();
    expect(screen.getByText("Album Test 2")).toBeInTheDocument();
  });
});
