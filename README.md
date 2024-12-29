# Short URL Generator Service

## Overview

This service generates short URLs from longer original URLs. It provides functionality to redirect the short URL back to the original URL.
## Tech stack
 - Expressjs, express-validator, jest, supertest
  
## Data structure fot storing URL
### USE `Map`  data structure for mapping longurl to shorturl. 
 1. **Effient Lookup(o(1)) time complexity**
 2. **Map ensure key uniqueness**
 3. **it provides direct association between entities as it is key-value store**

## Algorithm of short key generation and uniqueness handle process

1. **Input Combination**:
   - The input URL is combined with a randomly generated string using `crypto.randomBytes`. This randomness ensures uniqueness.
  
2. **Uniqueness Handling**:
   - By combining the URL with a random value before hashing, even identical URLs generate unique short keys, eliminating collisions

3. **Hashing**:
   - A `md5` hash is computed for the combined input. Hashing ensures a consistent output for a given input, enhancing security.

4. **Base64 Encoding**:
   - The hash digest is encoded into base64 to create a readable and compact string.

5. **Key Extraction**:
   - The first 6 characters of the base64 string are extracted to form the short key.


## Test Coverage

### 1. **POST `/api/urls/shorten`**
#### Tests Covered:
- **Valid URL Acceptance**: Confirms that the service accepts valid URLs and responds with status `200`.
- **Invalid URL Rejection**: Ensures that malformed URLs are rejected with status `400` and an appropriate error message.

---

### 2. **GET `/api/urls/:shortKey`**
#### Tests Covered:
- **Valid Short Key Redirection**: Verifies that a valid short key redirects to the original URL with status `302`.
- **Invalid Short Key Handling**: Ensures that non-existent short keys respond with status `404`.

---

### 3. **`generateShortKey` Utility Function**
#### Tests Covered:
- **Unique Short Key Generation**: Ensures that each call to the utility function generates a unique short key.
- **Collision Handling**: Verifies that the utility function avoids duplicate keys when a collision occurs.
- **Key Format Validation**: Confirms that the generated short keys are exactly 6 characters long and alphanumeric.

---

### 4. **Key Validation Logic**
#### Tests Covered:
- **Valid Key Check**: Ensures that the function properly identifies valid short keys stored in the `urlMap`.
- **Invalid Key Check**: Confirms that the function returns an appropriate error when a key does not exist in the mapping.

---

## API EndPoints
### POST `/api/urls/shorten`
  **Description**: Generates a short URL from a provided long URL

### Request Body :
```json
{
    "longUrl: "https://example.com"
}
```
### Response Body:
{
  "shortUrl": "http://localhost:3000/as34hY"
}

  
#### GET `/api/urls/:shortkey`
 **Description**: Redirect to orginal site when send get request

---

## How to Use

### Prerequisites

- **Node.js >=20.0.0** and **npm** should be installed.

### Steps to Run the Service

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. **Install dependencies**
   ```bash
   npm insall
   ```
3. **Start the server**
   ```bash
   npm start
   ```
4. ***Test the service**
   ```bash
   npm test
   ```


## Future Improvment
 - Add permanet storage like mongodb
 - Add caching like redis for faster access
 - Add count, expiration time into model for more analytics