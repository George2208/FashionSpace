import express, {Request, Response} from "express"
import { request } from "http"
import { Category, connect, Product, User } from "./database"

const app = express()
app.use(express.json())
const port = 8880
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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

app.post('/register', async (req: Request<RegisterData>, res: StatusResponse<any>) => {
    try {
        await User.create(req.body)
        res.send({data: null})
        // res.send({data: req.body})
    } catch (err: any) {
        res.send({error: err.message})
    }
})
app.post('/login', async (req: Request<{username: string, password: string}>, res: Response<any>) => {
    try {
        const user = await User.findOne({where: {username: req.body.username}})
        if(!user)
            throw new Error("Username does not exist")
        if(user.password != req.body.password)
            throw new Error("Passwords don't match")
        res.send(user)
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
app.get('/productByCategory/:name', async (req: Request<{name: string}>, res: Response<any>) => {
    try {
        const category = await Category.findOne({where: {name: req.params.name}})
        if(!category)
            throw new Error("Category does not exist")
        res.send(await Product.findAll({where: {CategoryId: category.id}}))
    } catch (err: any) {
        res.send({error: err.message})
    }
})

app.get('/product/:id', async (req: Request<any>, res: StatusResponse<any>) => {
    try {
        res.send({data: await Product.findOne({where: {id: req.params.id}})})
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

app.get('/test', async (req: Request, res: Response<any>) => {
    res.send("test");
})
connect().then(() => app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}))

