import request from "supertest";
import { urlMap } from "../utils/urlMap.js";
import generateShortKey from "../utils/generateKey.js";
import app from "../app.js";

jest.mock("../utils/urlMap.js", () => {
  const testMap = new Map();
  return {
    urlMap: testMap,
  };
});

describe("Short URL Service Tests", () => {
  beforeEach(() => {
    urlMap.clear();
  });
  //Post request to /api/urls/shorten
  describe("POST /api/urls/shorten", () => {
    it("should accept a valid URL", async () => {
      const response = await request(app)
        .post("/api/urls/shorten")
        .send({ longUrl: "https://example.com" });

      expect(response.status).toBe(200)
    });

    it("should reject an invalid URL", async () => {
      const response = await request(app)
        .post("/api/urls/shorten")
        .send({ longUrl: "ht://exapmle.com" });

      expect(response.status).toBe(400);
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            msg: "Invalid URL format",
          }),
        ])
      );
    });
  });
//Get request to /api/urls/:shortKey
  describe("GET api/urls/:shortKey", () => {
    it("should return the original URL for a valid short key", async () => {
      const shortKey = "abc123";
      const longUrl = "https://example.com";

      // Add entry to the map
      urlMap.set(shortKey, longUrl);

      const response = await request(app).get(`/api/urls/${shortKey}`);
      expect(response.status).toBe(302);
    });

    it("should return 404 for a non-existent short key", async () => {
      const response = await request(app).get("/api/urls/invalidKey");

      expect(response.status).toBe(400);
    });
  });
  //Generate short key utility function uniqueness
  describe("generateShortKey Utility Function", () => {
    it("should generate a unique short key for a given URL", () => {
      const longUrl = "https://example.com";

      const shortKey1 = generateShortKey(longUrl);
      const shortKey2 = generateShortKey(longUrl);

      expect(shortKey1).not.toBe(shortKey2); // Keys should be unique for each call
    });

    it("should handle collisions and generate unique keys", () => {
      const longUrl = "https://example.com";
      const existingKey = "abcdef";

      urlMap.set(existingKey, longUrl);

      const shortKey = generateShortKey(longUrl);

      expect(shortKey).not.toBe(existingKey);
      expect(urlMap.has(shortKey)).toBe(false);
    });

    it("should generate 6-character alphanumeric keys", () => {
      const longUrl = "https://example.com";

      const shortKey = generateShortKey(longUrl);

      expect(shortKey).toHaveLength(6);
      expect(/^[a-zA-Z0-9]{6}$/.test(shortKey)).toBe(true);
    });
  });
});
