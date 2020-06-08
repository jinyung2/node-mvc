const path = require('path');

const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);
router.get('/product-list', isAuth, adminController.getProducts);
// // /admin/add-product => POST
router.post('/add-product',
    [
        body('title',
            'Enter a valid title')
            .trim()
            .isString()
            .isLength({min: 3}),
        body('price',
            'Invalid price entered')
            .isFloat(),
        body('description',
            'Enter a description (min. 5 characters)')
            .isLength({min: 5, max: 500})
            .trim()
    ],
    isAuth, adminController.postAddProduct);
router.get('/edit-product/:productID', isAuth, adminController.getEditProduct);
router.post('/edit-product',
    [
        body('title',
            'Enter a valid title')
            .trim()
            .isString()
            .isLength({min: 3}),
        body('price',
            'Invalid price entered')
            .isFloat(),
        body('description',
            'Enter a description (min. 5 characters)')
            .isLength({min: 5, max: 500})
            .trim()
    ],
    isAuth, adminController.postEditProduct);
// delete is a http method/verb
router.delete('/product/:productId', isAuth, adminController.deleteProduct);

module.exports = router;
