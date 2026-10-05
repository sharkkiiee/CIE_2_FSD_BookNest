# BookNest – Personal Book Management System

BookNest is a full-stack React web application designed to help users organize and manage their personal book collection. Users can add books, view their library, track reading progress and status, update book details, and remove books from their collection.

The project was developed as part of the **CS3301 – Full Stack Development CIE-2 React Mini Project**.

---

## Problem Statement

Managing a personal reading list can become difficult when books, reading progress, and reading status are tracked manually or across different applications.

BookNest provides a centralized web application where users can maintain their personal collection, track their reading progress, and view useful reading statistics through a simple and responsive interface.

---

## Project Objectives

- Build a component-based web application using React.js.
- Implement reusable functional React components.
- Demonstrate the use of React props and parent-child communication.
- Use React Hooks such as `useState` and `useEffect`.
- Implement form handling and event handling.
- Implement client-side routing using React Router.
- Develop an Express.js backend with REST API endpoints.
- Integrate the React frontend with the Express backend.
- Provide CRUD operations for managing books.
- Add independent features beyond the reference implementation.

---

## Technologies Used

### Frontend

- React.js
- JavaScript
- React Router DOM
- Vite
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- CORS

### Data Storage

- JSON file storage

### Development Tools

- Visual Studio Code
- Git
- GitHub
- npm

---

## Main Features

### 1. Dashboard

The dashboard provides an overview of the user's reading collection.

It includes:

- Total number of books
- Want to Read count
- Currently Reading count
- Completed book count
- Overall reading progress
- Reading status breakdown
- Recently added books

---

### 2. Add Book

Users can add a new book by entering information such as:

- Book title
- Author
- Genre
- Reading status
- Reading progress
- Rating
- Description

The form sends the book information to the Express backend using a POST request.

---

### 3. My Library

The Library page displays the books stored in the application.

Users can:

- Search books by title or author.
- Filter books by reading status.
- Filter books by genre.
- Update reading status.
- Edit book information.
- Delete books.

---

### 4. Edit Book

The Edit Book feature allows users to modify information about an existing book.

A separate route is used:

`/edit/:id`

The application retrieves the selected book, displays its existing information in the reusable book form, and sends the updated information to the backend using a PUT request.

This feature was implemented as an independent project enhancement.

---

### 5. Reading Analytics

BookNest includes a Reading Analytics section on the dashboard.

The analytics are calculated dynamically from the books stored in the application.

The dashboard displays:

- Total books
- Want to Read
- Currently Reading
- Completed
- Average reading progress
- Percentage breakdown of reading statuses

This was implemented as an independent enhancement to provide users with a clearer overview of their reading habits.

---

### 6. Delete Book

Users can remove a book from their collection.

The application sends a DELETE request to the Express backend, which removes the selected book from the JSON data store.

---

## React Concepts Implemented

### Components

The application is divided into reusable components such as:

- `Navbar`
- `BookCard`
- `BookForm`
- `Stats`

Pages are also separated into individual components:

- `Dashboard`
- `Library`
- `AddBook`
- `EditBook`

---

### Functional Components

Most of the application is implemented using functional components.

Examples include:

- `Dashboard`
- `Library`
- `AddBook`
- `EditBook`
- `BookCard`
- `BookForm`
- `Navbar`

---

### Class Component

The `Stats` component is implemented as a React class component to demonstrate class-based React component usage.

It receives the `books` data through props and calculates the reading statistics before rendering them.

---

### Props and Parent-Child Communication

The `App` component maintains the main book collection and passes data and callback functions to child components.

For example:

- `books` is passed to `Dashboard`.
- `books` is passed to `Library`.
- `onUpdate` and `onDelete` are passed to `Library`.
- `books` and `onUpdate` are passed to `EditBook`.

This allows child components to interact with data managed by the parent component.

---

### useState

`useState` is used for managing changing application and component data.

Examples include:

- Book collection state in `App`
- Loading state in `App`
- Search input in `Library`
- Status and genre filters in `Library`
- Form data in `BookForm`
- Busy/loading state in `BookCard`

---

### useEffect

`useEffect` is used in `App.jsx` to fetch the books from the backend when the application loads.

```javascript
useEffect(() => {
  fetchBooks();
}, []);
```

---

### Event Handling

The application handles user interactions such as:

- Button clicks
- Form submission
- Search input changes
- Filter changes
- Status updates
- Delete confirmation
- Navigation

---

### Form Handling

The reusable `BookForm` component handles the creation and editing of books.

The same form component is used for:

- Adding a new book
- Editing an existing book

This reduces code duplication and demonstrates component reusability.

---

### Client-Side Routing

React Router is used to provide multiple views without requiring separate HTML pages.

The application contains the following routes:

| Route | Page |
|---|---|
| `/` | Dashboard |
| `/library` | My Library |
| `/add` | Add Book |
| `/edit/:id` | Edit Book |

---

## Backend API

The Express server runs on:

`http://localhost:5000`

The API endpoints are:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/books` | Retrieve all books |
| GET | `/api/books/:id` | Retrieve a specific book |
| POST | `/api/books` | Add a new book |
| PUT | `/api/books/:id` | Update an existing book |
| DELETE | `/api/books/:id` | Delete a book |
| GET | `/api/health` | Check server status |

The backend stores book information in:

`server/data/books.json`

---

## Frontend-Backend Integration

The React frontend communicates with the Express backend using the JavaScript `fetch()` API.

For example, books are retrieved using:

```javascript
fetch('http://localhost:5000/api/books')
```

When a new book is added, a POST request is sent to the backend.

When a book is edited, a PUT request is sent.

When a book is deleted, a DELETE request is sent.

After each successful operation, the application fetches the updated book collection so that the interface displays the latest data.

---

## Selected YouTube Tutorial

### Reference Tutorial

**MERN Stack Tutorial - Book Store Project**

Published by **freeCodeCamp.org**.

The tutorial covers concepts including:

- Backend CRUD
- Express
- CORS
- React
- React Router
- Frontend CRUD
- Book creation
- Book editing
- Book deletion
- Reusable book components

YouTube Tutorial:

https://www.youtube.com/watch?v=-42K44A1oMA

The tutorial was used as a reference for understanding the structure and implementation of a full-stack book management application. BookNest was independently adapted with a different interface, JSON-based data storage, reading-status functionality, and additional project enhancements.

---

## Modifications and Enhancements

### Modification 1 – Edit Book Functionality

An Edit Book feature was added to allow users to modify existing book information.

Implementation includes:

- Edit button on book cards
- Dynamic `/edit/:id` route
- Reusable `BookForm`
- PUT request to the Express API
- Updated book data stored by the backend
- Automatic return to the library after saving

---

### Modification 2 – Reading Analytics Dashboard

A Reading Analytics Dashboard was added to provide users with a summary of their reading activity.

The feature dynamically calculates:

- Total books
- Want to Read
- Currently Reading
- Completed books
- Average reading progress
- Reading-status percentages

The analytics are generated from the current book data rather than being hardcoded.

---

## Project Structure

```text
BookNest/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookCard.jsx
│   │   │   ├── BookForm.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Stats.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Library.jsx
│   │   │   ├── AddBook.jsx
│   │   │   └── EditBook.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   └── package.json
│
├── server/
│   ├── data/
│   │   └── books.json
│   ├── server.js
│   └── package.json
│
├── package.json
└── README.md
```

---

## How to Run the Project

### 1. Install the dependencies

From the root `BookNest` directory:

```bash
npm install
```

Then install the client and server dependencies:

```bash
npm run install-all
```

### 2. Start the application

Run:

```bash
npm run dev
```

This starts both:

- React frontend: `http://localhost:5173`
- Express backend: `http://localhost:5000`

### 3. Open the application

Open the following address in a browser:

```text
http://localhost:5173
```

---

## GitHub Repository

GitHub:

https://github.com/sharkkiiee/CIE_2_FSD_BookNest

The repository contains the React frontend, Express backend, project documentation, and development history.

---

## Conclusion

BookNest demonstrates the development of a full-stack React application using component-based architecture, React Hooks, React Router, form handling, REST APIs, and Express.js.

The project also extends the core book-management functionality through Edit Book functionality and a Reading Analytics Dashboard, providing a more useful and interactive reading management experience.