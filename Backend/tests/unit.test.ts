import { connect } from "../database"
import { addCategory, login, register } from "../routes"

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
})