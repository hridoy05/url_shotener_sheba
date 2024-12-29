import express from "express";
import { shortenUrl, redirectToLongUrl } from "../controller/urlController.js";
import { validateShortKey, validateUrl } from "../validation/validationUrl.js";


const router = express.Router();

// Shorten a long URL
router.post("/shorten", validateUrl, shortenUrl);

// Redirect short URL to long URL
router.get("/:shortKey",validateShortKey,redirectToLongUrl);

export default router;
