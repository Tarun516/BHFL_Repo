import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const { data } = req.body;
  const user_id = "john_doe_17091999";
  const email = "john@xyz.com";
  const roll_number = "ABCD123";
  let numbers = [];
  let alphabets = [];
  let highest_alphabet = [];

  if (Array.isArray(data)) {
    data.forEach((item) => {
      // Check if the item is a number
      if (!isNaN(item) && item.trim() !== "") {
        numbers.push(item);
      }
      // Check if the item is a single alphabetic character
      else if (
        typeof item === "string" &&
        item.length === 1 &&
        /^[A-Za-z]$/.test(item)
      ) {
        alphabets.push(item.toUpperCase());
      }
    });

    // Remove duplicates from alphabets
    alphabets = [...new Set(alphabets)];

    // Determine the highest alphabet
    if (alphabets.length > 0) {
      highest_alphabet.push(alphabets.sort((a, b) => a.localeCompare(b)).pop());
    }
  }

  res.status(200).json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_alphabet,
  });
});

router.get("/", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

export default router;
