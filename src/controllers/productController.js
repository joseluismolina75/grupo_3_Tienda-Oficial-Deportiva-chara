const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { filter } = require('../middlewares/validateProducts', '../middlewares/validateProductsEdit');



const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {

	// Detail - Detail from one product

	getDetail: (req, res) => {
		const pSelected = products.find(product => product.id == req.params.id)
		res.render('products/productDetail.ejs', { pSelected })
	},


	// Root - Show all products
	getProducts: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render('products/produ.ejs', { products })
	},

	//Create - Form to create
	getCreate: (req, res) => {
		res.render('products/productCreate.ejs')
	},

	// Create -  Method to store
	postStore: (req, res) => {
		console.log(req.body)
		let results = validationResult(req)
		 //console.log('1- errors', results);
		 //console.log('-------------------------------');
		 //console.log('2- errors mapped', results.mapped());

		if (results.isEmpty()) {
			console.log(results)
			// creamos nuevo producto del formulario con req.body
			const newProduct = {
				// id: products.length + 1,
				id: uuidv4(), //id unico uuid
				image: req.file?.filename || 'default.png', //imagen por defecto
				...req.body // spread operator
			}
			// Agrego nuevo producto al listado
			products.push(newProduct)
			// Convertir a JSON y escribir el archivo js
			fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
			// redireccionamos al listado de productos
			res.redirect('/products')
		} else {
			console.log(results),
				// res.render('product-create-form.ejs', {errors: results.errors, oldData: req.body})
				res.render('products/productCreate.ejs', { errors: results.mapped(), oldData: req.body })
		}

	},

	// Update - Form to edit
	edit: (req, res) => {
		const pToEdit = products.find(product => product.id == req.params.id)
		res.render('products/productEdit.ejs', { pToEdit })
	},
	// Update - Method to update
	update: (req, res) => {
		let results = validationResult(req)
		console.log('1- errors', results);
		console.log('-------------------------------');
		console.log('2- errors mapped', results.mapped());
		if (results.isEmpty()) {
		// JSON de productos
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		// Buscar el producto a editar
		const pToEdit = products.find(product => product.id == req.params.id)
		// Actualiza o deja el valor original del producto
		pToEdit.name = req.body.name || pToEdit.name
		pToEdit.price = req.body.price || pToEdit.price
		pToEdit.discount = req.body.discount || pToEdit.discount
		pToEdit.category = req.body.category || pToEdit.category
		pToEdit.description = req.body.description || pToEdit.description
		pToEdit.image = req.file?.filename || pToEdit.image
		// Escribe el nuevo JSON de productos
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
		res.redirect('/products')
	} else {
		console.log(results),
		// res.render('productEdit.ejs', {errors: results.errors, oldData: req.body})
		res.render('products/productEdit.ejs', { errors: results.mapped(), oldData: req.body })
	}

	},


	getCart: (req, res) => {
		// Lógica del controlador para la página de inicio
		res.render('products/productCart'); // Renderiza la plantilla 'productCart.ejs' en la carpeta 'views'
	},
	deleDestroy: (req, res) => {
		const id = req.params.id;
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		products=products.filter(product=>product.id != id)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
		res.redirect('/products')
	},
};

module.exports = controller;