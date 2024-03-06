import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserComponent from "./UserComponent";

describe("UserComponent", () => {
  // First test case to check the UserComponent is loaded and it expect the List of User Label.
  test("renders UserComponent", () => {
    render(<UserComponent />);
    expect(screen.getByText("List of Users")).toBeInTheDocument();
  });

  // Second test case is to check the search input and and return the name in the list
  test("searches for users", async () => {
    render(<UserComponent />);
    const searchInput = screen.getByPlaceholderText("Search user by name");
    fireEvent.change(searchInput, { target: { value: "Leanne" } });
    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    });
  });

  // Third test case is used for filtering shorting the users
  test("sorts users by name", async () => {
    render(<UserComponent />);
    const sortButton = screen.getByText("Name");
    fireEvent.click(sortButton);
    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    });
  });
});
