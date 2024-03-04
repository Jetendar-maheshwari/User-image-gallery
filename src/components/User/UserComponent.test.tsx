import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserComponent from "./UserComponent";

describe("UserComponent", () => {
  test("renders UserComponent", () => {
    render(<UserComponent />);
    expect(screen.getByText("List of Users")).toBeInTheDocument();
  });

  test("searches for users", async () => {
    render(<UserComponent />);
    const searchInput = screen.getByPlaceholderText("Search user by name");
    fireEvent.change(searchInput, { target: { value: "Leanne" } });
    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    });
  });

  test("sorts users by name", async () => {
    render(<UserComponent />);
    const sortButton = screen.getByText("Name");
    fireEvent.click(sortButton);
    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    });
  });
});
