const express = require("express");
const { registerControl, deletUser, loginControl } = require('../controllers/userController');
const { requestPasswordReset, resetPassword } = require('../controllers/ResetPass'); // Import password reset controllers
const { body } = require('express-validator');



// Router object
const router = express.Router();

// REGISTER || POST
router.post('/register', [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
], registerControl);

// Login || POST
router.post('/login', loginControl);

// Delete User || POST
router.post('/deleteuser', deletUser);
// Password Reset Request || POST
router.post('/reset-password', requestPasswordReset);


// Reset Password || POST
router.post('/reset-password/:token', (req, res) => {
    console.log("router Body : ",req.body)
    const token = req.params.token;
    console.log("Token received:", token);
    resetPassword(req, res,token);
});



module.exports = router;
