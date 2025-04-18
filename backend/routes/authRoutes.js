// backend/routes/authRoutes.js
const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Authentication routes
router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);

// Google OAuth login
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000/login" }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard"); // Redirect to dashboard after login
  }
);

// Logout Route
router.get("/auth/logout", (req, res) => {
  req.logout(function (err) {
    if (err) return res.status(500).json({ error: "Logout failed" });
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect("http://localhost:3000/"); // Redirect to home after logout
    });
  });
});

// Get logged-in user data
router.get("/auth/user", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// User routes
router.get("/user/profile", authenticate, userController.getProfile);
router.put("/user/update", authenticate, userController.updateProfile);

// Admin routes
router.get("/admin/users", authenticate, authorizeAdmin, userController.getAllUsers);
router.delete("/admin/users/:id", authenticate, authorizeAdmin, userController.deleteUser);

module.exports = router;