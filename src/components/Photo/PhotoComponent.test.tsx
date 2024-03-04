import { render, screen } from "@testing-library/react";
import PhotoComponent from "./PhotoComponent";
import API_BASE_URL from "../../utils/apiConfig";

describe("PhotoComponent", () => {
  test("renders PhotoComponent", () => {
    const photos = [
      { id: 1, thumbnailUrl: `${API_BASE_URL}/600/92c952` },
      { id: 2, thumbnailUrl: `${API_BASE_URL}/600/771796` },
    ];
    render(<PhotoComponent photos={photos} />);

    expect(screen.getByAltText("Photo 1")).toHaveAttribute(
      "src",
      photos[0].thumbnailUrl
    );
    expect(screen.getByAltText("Photo 2")).toHaveAttribute(
      "src",
      photos[1].thumbnailUrl
    );
  });
});
