import express, {Request, Response} from "express"
import { Category, connect, Product, User } from "./database"

const app = express()
app.use(express.json())
const port = 8080

interface RegisterData {
    firstName: string
    lastName: string
    username: string
    password: string
}
interface ProductData {
    name: string
	description: string
	size: string
	image: string
	price: number
}
type StatusResponse<T> = Response<{
    data?: T,
    error?: string
}>

app.post('/register', async (req: Request<RegisterData>, res: StatusResponse<null>) => {
    try {
        await User.create(req.body)
        res.send({data: null})
    } catch (err: any) {
        res.send({error: err.message})
    }
})
app.post('/login', async (req: Request<{username: string, password: string}>, res: StatusResponse<null>) => {
    try {
        const user = await User.findOne({where: {username: req.body.username}})
        if(!user)
            throw new Error("Username does not exist")
        if(user.password != req.body.password)
            throw new Error("Passwords don't match")
    } catch (err: any) {
        res.send({error: err.message})
    }
})
app.post('/addCategory', async (req: Request<{name: string}>, res: StatusResponse<null>) => {
    try {
        await Category.create(req.body)
        res.send({data: null})
    } catch (err: any) {
        res.send({error: err.message})
    }
})
app.post('/addProduct', async (req: Request<ProductData>, res: StatusResponse<null>) => {
    try {
        await Product.create(req.body)
        res.send({data: null})
    } catch (err: any) {
        res.send({error: err.message})
    }
})
app.post('/products', async (req: Request<{name: string}>, res: StatusResponse<any>) => {
    try {
        const category = await Category.findOne({where: {name: req.body.name}})
        if(!category)
            throw new Error("Category does not exist")
        res.send({data: await Product.findAll({where: {CategoryId: category.id}})})
    } catch (err: any) {
        res.send({error: err.message})
    }
})

/// ------------------------------------------------------------------------------

app.get('/users', async (req: Request, res: Response<any>) => {
    res.send(await User.findAll({}))
})
app.get('/categories', async (req: Request, res: Response<any>) => {
    res.send(await Category.findAll({}))
})
app.get('/products', async (req: Request, res: Response<any>) => {
    res.send(await Product.findAll({}))
})

connect().then(() => app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}))

