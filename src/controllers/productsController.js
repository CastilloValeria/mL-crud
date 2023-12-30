const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products", {
			products: lectura("productsDataBase"),
			toThousand,
		});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const { id } = req.params;
		const products = lectura("productsDataBase");
		const product = products.find((producto) => producto.id == id);

		// res.render("detail",{title:product.name,product,toThousand})
		res.render("detail", { product, toThousand });
	},


	// Create - Form to create
	create: (req, res) => {
	res.render("product-create-form");	
	},

// Create -  Method to store
store: (req, res) => {
	const lectura = () => {
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		return products;
	}
	const archivoJson = lectura("productsDataBase");
	const id = archivoJson[archivoJson.length - 1].id + 1;
	const { name, price, discount, category, description } = req.body;
	let obNuevo = {
		id,
		name,
		price: +price,
		discount: +discount,
		category,
		description,
		image: "default-image.png",
	};
	let nuevoElemento = [...archivoJson, obNuevo];
	escritura(nuevoElemento, "productsDataBase");
	res.redirect("/products");
},

// Update - Form to edit
edit: (req, res) => {
		const products = getJson("productsDataBase");
		const product = products.find((producto) => producto.id == id);
		res.render("product-edit-form", { product }
		);
	},

// Update - Method to update
update: (req, res) => {
    const file = req.file
    const { id } = req.params;
    const products = lectura("productsDataBase");
    const { name, price, discount, category, description} = req.body;
    const nuevoArray = products.map((product) => {
    if (product.id == id) {
    return {
        id: +id,
        name: name.trim(),
        price: +price,
        discount: +discount,
        category,
        description: description.trim(),
        image: file ? file.filename : product.image,
        };
    }
    return product;
    });

    escritura(nuevoArray, "productsDataBase");
    res.redirect(`/products/${id}`);
},
// Delete - Delete one product from DB   
			destroy: (req, res) => {
				const id = req.params;
				const leerjson = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
				// console.log(leerjson); 
				const producto = leerjson.products.filter(producto => producto.id != id);
				const json = JSON.stringify({ products: producto });
				fs.writeFileSync(productsFilePath, json, "utf-8");
				res.redirect("/products");
			}
			// destroy: (req, res) => {
				// const {id}= req.params;
				// const archivoJson = getJson("productsDataBase");
				// const product = archivoJson.find(producto => producto.id == id);
			// 
};

module.exports = controller;