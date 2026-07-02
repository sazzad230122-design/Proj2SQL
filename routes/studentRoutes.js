const express = require("express");
const router = express.Router();

const db = require("../models/db");

// GET All Students
router.get("/", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});

// ADD Student
router.post("/", (req, res) => {
  const { name, department, phone } = req.body;

  db.query(
    "INSERT INTO students (name, department, phone) VALUES (?, ?, ?)",
    [name, department, phone],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Student Added Successfully",
      });
    }
  );
});

// UPDATE Student
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, department, phone } = req.body;

  db.query(
    "UPDATE students SET name=?, department=?, phone=? WHERE id=?",
    [name, department, phone, id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Student Updated Successfully",
      });
    }
  );
});

// DELETE Student
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM students WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      message: "Student Deleted Successfully",
    });
  });
});

module.exports = router;