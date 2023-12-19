# Architecture Decision Record (ADR)

## ADR 1: Modularization and Separation of Concerns

### Context

The codebase requires improvements in modularization and separation of concerns to enhance maintainability, readability, and testability.

### Decision

1. **User Schema and Model (`models/user.ts`):** Moved the user schema and model definition into a separate module (`models/user.ts`) for better separation of concerns.
2. **User-Related Routes (`controllers/user.ts`):** Created a dedicated module (`controllers/user.ts`) to handle the logic for user-related routes.
3. **Middleware (`middleware/logger.ts`), (`middleware/validations.ts`):** Created a dedicated module for logging and validation.

### Rationale

Separating concerns enhances code maintainability by providing a clear structure and isolating distinct functionalities.

## ADR 2: Input Validation

### Context

To enhance API security and prevent invalid data from reaching the database, input validation needs to be implemented for all incoming requests.

### Decision

Implemented input validation for POST routes using the `express-validator` library. A middleware function (`middleware/validation.ts`) is introduced for this purpose.

### Rationale

Input validation improves API security by ensuring that incoming data adheres to specified rules, preventing potential vulnerabilities.

## ADR 3: Comprehensive Error Handling and Logging

### Context

To improve code maintainability and provide detailed error logs for debugging, a centralized error handling mechanism with comprehensive logging is required.

### Decision

1. **Custom Error Handler Middleware (`middleware/logger.ts`):** Implemented a custom error handler middleware to centralize error handling.
2. **Logging with Winston:** Added comprehensive logging for errors, including stack traces, using the `winston` library.

### Rationale

Centralized error handling streamlines the debugging process, while comprehensive logging provides valuable insights into the system's behavior.

## ADR 4: Rate Limiting for Protection

### Context

Protection against abuse and denial-of-service attacks is necessary to ensure fair API usage and prevent resource exhaustion.

### Decision

Implemented rate limiting using the `express-rate-limit` middleware. The rate limiter is configured to limit the number of requests per IP address.

### Rationale

Rate limiting safeguards the API from abuse, promoting fair usage and protecting against denial-of-service attacks.

## ADR 5: Database Queries and Indexing Optimization

### Context

Optimizing database queries and indexing is essential for improving overall performance.

### Decision

1. **Lean() Method:** Used the `lean()` method when querying the database to return plain JavaScript objects instead of Mongoose documents.
2. **Indexing (`email` field):** Indexed the `email` field in the MongoDB schema to enhance query performance, especially for the unique constraint.

### Rationale

The `lean()` method reduces memory usage and speeds up queries, while indexing improves the efficiency of specific queries, notably those involving unique constraints.

## ADR 6: Transition to TypeScript

### Context

To introduce static typing and enhance the developer experience, transitioning the codebase to TypeScript is deemed necessary.

### Decision

1. **Conversion to TypeScript:** Converted the codebase to TypeScript for static typing and improved developer experience.
2. **TypeScript Interfaces:** Created TypeScript interfaces for better type definition and documentation.

### Rationale

TypeScript provides static typing, reducing the likelihood of runtime errors and improving code readability. The use of interfaces enhances documentation and provides clear type definitions.

---

# To start the dashboard, follow the below steps:

## **Direact to the task directory**
    ```bash
    cd task
    cd webserver-typescript

1. **Install Dependencies:**
   ```bash
   npm install
2. **Start the Project:**
   ```bash
   npm start

