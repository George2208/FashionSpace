import { connect } from "../database"
import { getUsers, getProductsByCategory, addCategory, addProduct, login, register, getCategory, getProduct } from "../routes"
import { Category, Product, User } from "../database"

describe("routes", () => {
    it("register", async () => {
        await connect()
        expect(await register({"firstname": "st234ring",
        "lastname": "str2342ing",
        "username": "strings",
        "password": "334"})).toBe(null)
    })
    it("login", async () => {
        await connect()
        expect(await login({
        "username": "strings",
        "password": "334"})).toBe(null)
    })
    it("add category", async () => {
        await connect()
        expect(await addCategory({
        "name": "category"})).toBe(null)
    })
    it("add product", async () => {
        await connect()
        expect(await addProduct({
            name: "test",
            description: "test",
            size: "50",
            image: "test.jpg",
            price: 100,
            CategoryId: 10})).toBe(null)
    })
    it("get products by category", async () => {
        await connect()
        expect(await getProductsByCategory({
        "name": "test"})).toBe(null)
    })
    it("get all users", async () => {
        await connect()
        expect(await getUsers()).toBe(User.findAll({}))
    })

    it("get all categories", async () => {
        await connect()
        expect(await getCategory()).toBe(Category.findAll({}))
    })

    it("get all products", async () => {
        await connect()
        expect(await getProduct()).toBe(Product.findAll({}))
    })
})