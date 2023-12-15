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
		const{id}=req.params;
		const product=products.find(product=>product.id==id);
		res.render("product-edit-form",{title:product.name,product,toThousand})
		
	},
	// Update - Method to update
	update: (req, res) => {
		const{id}=req.params;
		const {name,price,discount,category,description,image}= req.body;
		const nuevoArray= product.map(product =>{
			if ( product.id ==id ){
				return {
					id,
					name:name.trim(),
					price,
					discount,
					category,
					description:description.trim(),
					image: image ? image : product.image
				}
				return product
			}
		})
		const json=JSON.stringify(nuevoArray)
		fs.writeFileSync(productsFilePath,json,"utf-8")
		// res.redirect(´/product/detail/${id}´)
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