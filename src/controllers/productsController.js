const { lectura, escritura } = require("../utility/moduloProp");
const fs = require('fs');


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

		res.render("detail",{title:product.name,product,toThousand})
		
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
	res.redirect("/products",title);
},

// Update - Form to edit
edit: (req, res) => {
    const { id } = req.params;
    const products = lectura("productsDataBase");
    const product = products.find((producto) => producto.id == id);
    res.render("product-edit-form",{title:product.name,product,toThousand});
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
    res.redirect(`/products`);
},
// Delete - Delete one product from DB   
	 destroy: (req, res) => {
				const {id}= req.params;
				const archivoJson = lectura("productsDataBase");
				const producto = products.filter( producto => producto.id != id );
					const json = JSON.stringify(producto);
					fs.writeFileSync(productsFilePath,json,"utf-8");
					res.redirect("/products")
				}

};

module.exports = controller;