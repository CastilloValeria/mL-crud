const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("index")
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const{id}=req.params;
		const product=products.find(product=>product.id==id);
		res.render("detail",{title:product.name,product,toThousand})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		
		res.render("product-create-form")
	},

	// Update - Form to edit
	edit: (req, res) => {
		
		res.render("product-edit-form")
	},
	// Update - Method to update
	update: (req, res) => {
		res.rende('product-edit-form')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const id= +req.params.id
		const archivoJson = loadProduct();
		const productosRestantes = archivosJson.filter(product => product.id !== id)
		res.send(productosRestantes)

		storeProduct(productosRestantes);
		return res.redirect('/products')
		storeProduct(productosRestantes)
		
	}
};

module.exports = controller;