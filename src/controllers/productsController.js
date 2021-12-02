const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = dataBase => fs.writeFileSync(productsFilePath, JSON.stringify(dataBase), "utf-8")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let productId = +req.params.id
		let product = products.find(product => product.id === productId)

		res.render('detail',{
			product,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name, price, discount, category, description} = req.body

		let lastId = 0
		products.forEach(product => {
			if(product.id > lastId){
				lastId = product.id
			}
		});

		let newProduct = {
			id: lastId + 1,
			name: name,
			price: price,
			discount: discount,
			category: category,
			description: description,
			image: "default-image.png"
		}
		products.push(newProduct)

		writeJson(products)

		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let productId = +req.params.id
		let productToEdit = products.find(product => product.id === productId)
		res.render('product-edit-form',{
			product: productToEdit
		})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;