const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "AbdulIsThe$King"
// Route 1: Create a user using Post "/api/auth/createuser" No login require
router.post("/createuser", [
    body('name', "Enter correct name").isLength({ min: 3 }),
    body('email', "Invalid email address").isEmail(),
    body('password', "Password must be atleast 5 char").isLength({ min: 5 }),
], async (req, res) => {
    // Cheak and display error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Checking is the user already exist with same email address
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ "error": "User already exist with same e-mail address" });
        }
        const salt = bcrypt.genSaltSync(10);
        const secPassword = bcrypt.hashSync(req.body.password, salt);
        // Creating a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        res.send({authToken});
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Internal server error" });
    }
});

// Route 2: Login user using Post "/api/auth/login" No login require
router.post("/login", [
    body('email', "Invalid email address").isEmail(),
    body('password', "Password must be atleast 5 char").isLength({ min: 5 }),
], async (req, res) => {
    // Cheak and display error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        // Checking is the user exist with email address
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ "error": "Pls try to login with correct credentials" });
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ "error": "Pls try to login with correct credentials" });
        }
        // If paassword not compared returning id & token
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        res.send({authToken})
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Internal server error" });
    }
});

// Route 3: Getting user details using token using Post "/api/auth/getuser" Login require
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Internal server error" });
    }
});

// Route 4: Fetching note from database get "/api/auth/getNote" Login require
router.get("/getNote", fetchuser, async (req,res) =>{
    try {
        const userId = req.user.id;
        const note = await User.findById(userId).select("userNote");
        res.send(note);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
})


// Route 5: Adding or updating note Put "/api/auth/addNote" Login require
router.put("/addNote", fetchuser, async (req, res) =>{
    try {
        const userId = req.user.id;
        const newNote = req.body.newNote;
        const note = await User.findByIdAndUpdate(
            userId,
            { $set: { userNote: newNote }},
            { new: true }
        );
        if (!note) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({"success": "note updated"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Note update fail" });
    }
})

module.exports = router;