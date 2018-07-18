const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/product');

router.get('/', ProductsController.get_products);

router.post('/', checkAuth ,ProductsController.create_product);

router.get('/:productId',ProductsController.get_product);

router.patch("/:productId",checkAuth, ProductsController.update_product);

router.delete('/:productId', checkAuth ,ProductsController.delete_product);

module.exports = router;

// const id = req.params.productId;
//     if(id === 'special'){
//         res.status(200).json({
//             message: 'You discovered the special ID',
//             id:id
//         })
//     }else {
//         res.status(200).json({
//             message:"You passed an ID"
//         })
//     }