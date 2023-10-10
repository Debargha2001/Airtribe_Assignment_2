
---

# News Aggregator API


This API allows you to manage user registration, login, and access news based on user preferences.

## Download and Setup

1. **Download the Project:** Download the project from the repository.
2. **Change to the Project Directory:** Use the command line to navigate to the project directory.
3. **Install Dependencies:** Run the following command to install project dependencies:

   ```bash
   npm install
   ```

4. **Start the Server:** To start the server, use the following command:

   ```bash
   npm run start
   ```

## Routes and APIs

### Base URL: `localhost:5000`

### Register

- **Method:** POST
- **Route:** `/register`
- **Description:** Register a new user.

### Login

- **Method:** POST
- **Route:** `/login`
- **Description:** Log in a user.

### Fetch News by User's Preferences

- **Method:** GET
- **Route:** `/news`
- **Description:** Fetch news based on the user's preferences.

### Search News by Keyword

- **Method:** GET
- **Route:** `/news/search/:keyword`
- **Description:** Search news by keywords.

### Mark a News as Read

- **Method:** POST
- **Route:** `/news/:id/read`
- **Description:** Mark a news as read for a logged-in user.

### Add a News to Favorites

- **Method:** POST
- **Route:** `/news/:id/favorite`
- **Description:** Add a news to the favorite news list for a logged-in user.

### Fetch All Read News

- **Method:** GET
- **Route:** `/news/read`
- **Description:** Fetch all read news for a logged-in user.

### Fetch All Favorite News

- **Method:** GET
- **Route:** `/news/favorites`
- **Description:** Fetch all favorite news for a logged-in user.

### Update User Preferences

- **Method:** PUT
- **Route:** `/preferences`
- **Description:** Update a logged-in user's preferences for news.

### Fetch User Preferences

- **Method:** GET
- **Route:** `/preferences`
- **Description:** Fetch a logged-in user's preferences for news.

---

