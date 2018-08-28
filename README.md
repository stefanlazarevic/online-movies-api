# Online Movies API microservice

## REST API built as an micro-service for online-movies web application.

### Built using following technologies:

- JavaScript (ES6)
- Node.js + Express.js
- JSON Web Tokens
- MongoDB + Mongoose

### API Endpoints:

```javascript

    --- auth

    // Generate jwt token.
    POST /api/v{api_version}/auth/login

    --- Movies

    // Get all movies.
    GET /api/v{api_version}/movies

    // Get movie
    GET /api/v{api_version}/movies/{movie_id}

    // Create new movie (Private)
    POST /api/v{api_version}/movies/

    // Update movie (Private)
    PUT /api/v{api_version}/movies/{movie_id}

    // Delete movie (Private)
    DELETE /api/v{api_version}/movies/{movie_id}

    --- Categories

    // Get all categories.
    GET /api/v{api_version}/categories

    // Get category
    GET /api/v{api_version}/categories/{category_id}

    // Create new category (Private)
    POST /api/v{api_version}/categories

    // Update category (Private)
    PUT /api/v{api_version}/categories/{category_id}

    // Delete category (Private)
    DELETE /api/v{api_version}/categories/{category_id}

    --- Category movies

    // Get all movies in category.
    GET /api/v{api_version}/categories/{category_id}/movies

    // Get movie in category.
    GET /api/v{api_version}/categories/{category_id}/movies/{movie_id}

    // Create new movie under category (Private)
    POST /api/v{api_version}/categories/{category_id}/movies

    // Update movie under category (Private)
    PUT /api/v{api_version}/categories/{category_id}/movies/{movie_id}

    // Delete movie under category (Private)
    DELETE /api/v{api_version}/categories/{category_id}/movies/{movie_id}
```

### TODO Checklist:

- Create test cases for all endpoints.
- Create ping endpoint.
- Create root endpoint that will return some details about api.
- Create Development documentation.
- Improve project structure.

### Known issues:

- None

### License:

<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
