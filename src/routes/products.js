// ************ Require's ************
const express = require('express');
const router=express.Router();

// ************ Validations middlewares ************ 
const validateProducts = require('../middlewares/validateProducts')
const validateProductsEdit = require('../middlewares/validateProductsEdit')


// multer middleware
const upload = require('../middlewares/multer')



// ************ Controller Require ************
let productController=require('../controllers/productController.js');

/*** GET ALL PRODUCTS http://localhost:5000/products ***/
router.get('/', productController.getProducts);

/*** CREATE ONE PRODUCT http://localhost:5000/products/create ***/
router.get('/create', productController.getCreate);
router.post('/create', upload.single('images'), validateProducts, productController.postStore);


router.get('/detail/:id', productController.getDetail);
router.get('/cart', productController.getCart);

/*** EDIT ONE PRODUCT http://localhost:5000/products/edit/1 ***/
router.get('/edit/:id', productController.edit);
router.put('/edit/:id', upload.single('images'), validateProductsEdit, productController.update);

router.delete('/delete/:id', productController.deleDestroy)


module.exports=router;