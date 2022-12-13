import { Category, Product, User } from "./database"

export async function register(data: {
    firstname: string
    lastname: string
    username: string
    password: string
}) {
    await User.create(data)
    return null
}

export async function login(data: {
    username: string
    password: string
}) {
    const user = await User.findOne({where: {username: data.username}})
    if(!user)
        throw new Error("Username does not exist")
    if(user.password != data.password)
        throw new Error("Passwords don't match")
    return null
}

export async function addCategory(data: {
    name: string
}) {
    await Category.create(data)
    return null
}

export async function addProduct(data: {
    name: string
	description: string
	size: string
	image: string
	price: number
    CategoryId: number
}) {
    await Product.create(data)
    return null
}

export async function getProductsByCategory(data: {
    name: string
}) {
    const category = await Category.findOne({where: {name: data.name}})
    if(!category)
        throw new Error("Category does not exist")
    return Product.findAll({where: {CategoryId: category.id}})
}

export async function getUsers() {
    return User.findAll({})
}

export async function getCategory() {
    return Category.findAll({})
}

export async function getProduct() {
    return Product.findAll({})
}