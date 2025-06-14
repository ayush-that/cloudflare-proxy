require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/fetch-tsv", async (req, res) => {
  const url = "https://payvn333.com/api/payouts/export-tsv";
  const headers = {
    "x-api-key": process.env.API_KEY,
    "User-Agent": "Mozilla/5.0",
    Accept: "text/tab-separated-values",
  };

  try {
    const response = await axios.get(url, { headers });
    res.setHeader("Content-Type", "text/tab-separated-values");
    res.status(200).send(response.data);
  } catch (error) {
    console.error("Proxy error:", error.message);
    res.status(500).json({ error: "Failed to fetch TSV from payvn333.com" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
