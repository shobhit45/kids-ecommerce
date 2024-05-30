const Express = require("express");
const router = Express.Router();
const USER = require("../models/userSchema")
var bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUSER = require('../Middleware/FtechUsers')
const JWT_SECRET = process.env.JWT_SECRET;
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// ROUTE 1: CREATE A USER
// Backend code with comments indicating changes
// Ensure proper validation and user creation route

// Middleware for validation
router.post('/CreatUSER',
    [
        // Validation checks
        body('email', 'Invalid email').isEmail(),
        body('name', 'Minimum word requirement is 5').isLength({ min: 5 }),
        body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
    ],
    async (req, res) => {
        console.log("Creating a user");

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let user = await USER.findOne({ email: req.body.email });

            if (user) {
                return res.status(400).json({
                    success: false,
                    error: "The email address is already registered"
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            user = await USER.create({
                name: req.body.name,
                password: hashedPassword,
                email: req.body.email
            });

            const data = { user: { id: user.id } };
            const AUTH_TOKEN = jwt.sign(data, JWT_SECRET);

            res.json({ AUTH_TOKEN, success: true });

        } catch (error) {
            console.error("Error occurred:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);



//ROUTE 2: CREATING A LOGIN ENDPOINT ---AUTHENTICATE THE USER -----

router.post('/Login',

    [
        //  these are validation check..

        body('email', 'invalid mail').isEmail(),
        body('password', 'Enter the password').exists(),
    ],

    async (req, res) => {

        let Success = true;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body

        try {

            let user = await USER.findOne({ email: req.body.email });
            if (!(user)) {
                // if user doesnot exists then give a this msg
                Success = false;
                return res.status(400).json(
                    {
                        "error": "please try again invalid credetials"
                    })
            }
            console.log(user);
            //  if the user exists compare the two password
            const compareResults = await bcrypt.compare(password, user.password)
            // here compare(entered_password,hash_password_stored)

            if (!(compareResults)) {
                // if passowrd doesnot  macth
                Success = false;
                return res.status(400).json(
                    {
                        "error": "please try again invalid credetials"
                    })
            }

            const data = {
                user: {
                    id: user.id
                }
            }

            const AUTH_TOKEN = jwt.sign(data, JWT_SECRET)

            // console.log(user);
            res.status(200).json({ AUTH_TOKEN, Success })

        } catch (error) {
            console.log({ "Error occouerd !!": error });
            res.status(400).json(error)
        }

    })


//ROUTE 3 : GETTING THE DETAILS FROM THE TOKEN FOUND ---------------------
router.get('/GetUser', fetchUSER, async (req, res) => {

    try {
        var userId = req.user.id
        const user = await USER.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log({ "Error occouerd !!": error });
        res.status(401).json(error)
    }

})

module.exports = router