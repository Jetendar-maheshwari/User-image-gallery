# React frontend project to show the user list and their albums and photos

## API used

API of [JSONPlaceholder](https://jsonplaceholder.typicode.com/) is used for change please check the file apiConfig inside the utils folder.

## Scripts which need to run the project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npx cypress run`

Also change the cy.visit("http://localhost:3000/"); Path inside the cypress/e2e folder the file name UserList.cy.ts
To run the e2e tests of complete application.\
See the section about [running tests](https://www.cypress.io/) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `Frontend Technologies Used`

- React was chosen as the frontend framework for constructing the user interface.
- Components were organized into reusable pieces to promote modularity and maintainability.
- State management techniques such as the React Context API, TypeScript, and Bootstrap CSS were implemented to manage document data and UI states effectively.
- - All Git and GitLab practices, including branches and merge requests, were followed.

## Learn more from the documentation to create a project

- React: https://reactjs.org
- JSON API Data: https://jsonplaceholder.typicode.com/
- JEST: https://jestjs.io/
- cypress: https://www.cypress.io/
- Git: https://git-scm.com

### `Project UI Images`

![User List](src/images/UserList.png)
![Photo Gallery Modal](src/images/PhotoGalleryModal.png)
![New Album Modal](src/images/NewAlbumModal.png)
