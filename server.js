require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("*", async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  const headers = { ...req.headers };
  delete headers.host;

  headers["x-api-key"] = "a7f3c8d9e0b2f45a6c1d7e9b34f0a8cd";

  try {
    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers,
      data: req.body,
      params: { ...req.query, url: undefined },
    });

    Object.keys(response.headers).forEach((key) => {
      res.setHeader(key, response.headers[key]);
    });

    res.status(response.status).send(response.data);
  } catch (error) {
    console.error("Proxy error:", error.message);
    res.status(error.response?.status || 500).json({
      error: "Proxy request failed",
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
