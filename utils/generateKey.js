import crypto from "crypto";

export default function generateShortKey(url) {
  let shortKey = "";

  // Generate a hash by combining the URL and a random value for uniqueness
  const randomValue = crypto.randomBytes(3).toString("hex");
  const input = `${url}-${randomValue}`;

  // Create hash
  const hash = crypto.createHash("md5").update(input).digest("hex");

  // Convert to base64 and slice to get the 6-character short key
  shortKey = Buffer.from(hash).toString("base64").slice(0, 6);

  return shortKey;
}

