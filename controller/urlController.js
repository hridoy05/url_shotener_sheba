import { urlMap } from "../utils/urlMap.js";
import generateShortKey from "../utils/generateKey.js";

export const shortenUrl = (req, res) => {
  const { longUrl } = req.body;

  // Generate a unique short key
  const shortKey = generateShortKey(longUrl);

  // Store the mapping
  urlMap.set(shortKey, longUrl);

  return res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortKey}` });
};

export const redirectToLongUrl = (req, res) => {
  const { shortKey } = req.params;

  if (urlMap.has(shortKey)) {
    const longUrl = urlMap.get(shortKey);
    res.redirect(longUrl);
  } else {
   return res.status(404).json({ error: "Short URL not found" });
  }
};
