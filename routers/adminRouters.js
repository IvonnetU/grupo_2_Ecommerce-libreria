// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const adminController = require('../controllers/adminController');

/************** Declaración de multer ******/
let multerDiskStorage = multer.diskStorage({
  destination:(req, file, callback) => {
    let folder = path.join(__dirname,'../public/images/books');
    callback(null, folder);
  },
  filename:(req, file, callback) => {
    let imageName = 'book-' + Date.now() + path.extname(file.originalname);
    callback(null,imageName);
  }
})

let fileUpload = multer({ storage: multerDiskStorage});

/*** GET TODOS LOS PRODUCTOS ***/ 
router.get('/', adminController.index); 

/*** CREAR UN PRODUCTO ***/ 
router.get('/create', adminController.add); 
router.post('/create',fileUpload.single('imagebook'), adminController.store); 


/*** EDITAR UN PRODUCTO ***/ 
router.get('/edit/:id', adminController.edit); 
router.put('/edit/:id', adminController.update); 


/*** ELIMINAR UN PRODUCTO***/ 
router.delete('/delete/:id', adminController.delete); 


module.exports = router;