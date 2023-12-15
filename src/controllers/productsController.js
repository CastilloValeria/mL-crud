const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

// const getJason = ()=>{
// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
// return products;
// }
// 
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("index")
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const{id}=req.params;
		// const products= getJason();
		const product=products.find(product=>product.id==id);
		res.render("detail",{title:product.name,product,toThousand})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},

	// Create -  Method to store
	store: (req, res) => {
	const getJason = ()=>{
	const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
	return products;}
	const archivoJson = getJson("productsDataBase");
    const id = archivoJson[archivoJson.length - 1].id + 1;
    const { name, price, discount, category, description } = req.body;
    let newObjeto = {
    id,
    name,
    price: +price,
    discount: +discount,
    category,
    description,
    image: "default-image.png",
    };
    let newArchivo = [...archivoJson, newObjeto];
    setJson(newArchivo, "productsDataBase");
    res.redirect("/products");
	},

	// Update - Form to edit
	edit: (req, res) => {
	const{id}=req.params;
		// const products= getJason();
	const product=products.find(product=>product.id==id);
	res.render("product-edit-form",{title:product.name,product,toThousand})
		
	},
	// Update - Method to update
	update: (req, res) => {
	const{id}=req.params;
	const {name,price,discount,category,description,image}= req.body;
		// const products= getJason();
	const nuevoArray= products.map(product =>{
			if ( product.id == id ){
				return {
					id,
					name:name.trim(),
					description:description.trim(),
					price:+price,
					discount:+discount,					
					image: image ? image : product.image,
					category,
				};
			}
			return product
		})
		const json=JSON.stringify(nuevoArray)
		fs.writeFileSync(productsFilePath,json,"utf-8")
		res.redirect(`/products/detail/${id}`);
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