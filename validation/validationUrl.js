import { body, param } from "express-validator";
import { handleValidationErrors } from "../midddleware/throwValidationErrorMiddleware.js";

export const validateUrl = [
  body("longUrl")
    .isURL({
        protocols: ["http", "https"],
        require_protocol: true,
        require_host: true

    })
    .withMessage("Invalid URL format"),
  handleValidationErrors, 
];

export const validateShortKey = [
  param("shortKey")
    .isLength({ min: 6, max: 6 })
    .withMessage("The short key must be exactly 6 characters long")
    .isAlphanumeric()
    .withMessage("The short key must be alphanumeric"),
  handleValidationErrors,
];
