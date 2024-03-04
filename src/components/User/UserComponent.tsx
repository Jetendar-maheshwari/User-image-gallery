import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./UserComponent.css";
import API_BASE_URL from "../../utils/apiConfig";

interface User {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

const UserComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(10);
  const [error, setError] = useState<string>("");

  //Add pagination for more than ten users entries
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  /**
   *  fetch the list of all users
   */
  useEffect(() => {
    if (!users) {
      return;
    }
    fetch(`${API_BASE_URL}/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users data");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  /**
   * Searching by user name and filtering the records based on the search term
   * @param event
   */
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    filterUsers(event.target.value);
  };

  /**
   * Filter the
   * @param searchQuery
   */
  const filterUsers = (searchQuery: string) => {
    const filteredData = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };

  /**
   * Clicking on the user name column should sort user names in ascending or descending order
   */
  const handleSort = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">List of Users</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search user by name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>No.</th>
            <th onClick={handleSort} style={{ cursor: "pointer" }}>
              Name
              {sortOrder === "asc" ? (
                <FaArrowUp className="ml-1" />
              ) : (
                <FaArrowDown className="ml-1" />
              )}
            </th>
            <th>Email</th>
            <th>Street</th>
            <th>Suite</th>
            <th>City</th>
            <th>Zipcode</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{indexOfFirstUser + index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.street}</td>
              <td>{user.address.suite}</td>
              <td>{user.address.city}</td>
              <td>{user.address.zipcode}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* pagination */}
      <nav>
        <ul className="pagination justify-content-end">
          {Array.from(
            { length: Math.ceil(filteredUsers.length / usersPerPage) },
            (_, i) => (
              <li
                key={i}
                className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
              >
                <button onClick={() => paginate(i + 1)} className="page-link">
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};

export default UserComponent;
