const express = require('express');
const { check, body } = require('express-validator');
const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.get('/reset', authController.getReset);

router.post('/login',
    [
        body('email',
            'Please enter a valid email')
            .isEmail()
          .normalizeEmail(),
        body('password',
            'Invalid password')
            .isLength({min: 6})
            .isAlphanumeric()
            .trim()
    ],
    authController.postLogin);

router.post('/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter valid email')
            .custom((value, {req}) => {
            //     if (value === 'test@test.com') {
            //         throw new Error('This email is forbidden');
            //     }
            //     return true; }
            return User.findOne({email: value})
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Email already in use.');
                    }
                })
            })
            .normalizeEmail(),
        body('password',
            'Please enter valid password\nMinimum 8 characters\nMust be only contain numbers and letters')
            .isLength({min: 6})
            .isAlphanumeric()
            .trim(),
        check('confirmPassword')
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match.')
                }
                return true;
            })

    ],
    authController.postSignup);

router.post('/logout', authController.postLogout);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword)

router.post('/new-password', authController.postNewPassword);

module.exports = router;
