import express, {Request, Response} from "express"
import { connect } from "./database"
import { addCategory, addProduct, getCategory, getProduct, getProductsByCategory, getUsers, login, register } from "./routes"

const app = express()
app.use(express.json())
const port = 8080

function handlePost(route: string, fn: (data: any) => Promise<any>) {
    app.post(route, async (req: Request<any>, res: Response<any>) => {
        try {
            res.send({data: await fn(req.body)})
        } catch (err: any) {
            res.send({error: err.message})
        }
    })
}
function handleGet(route: string, fn: (data: any) => Promise<any>) {
    app.get(route, async (req: Request<any>, res: Response<any>) => {
        try {
            res.send({data: await fn(req.body)})
        } catch (err: any) {
            res.send({error: err.message})
        }
    })
}

handlePost('/register', register)
handlePost('/login', login)
handlePost('/addCategory', addCategory)
handlePost('/addProduct', addProduct)
handlePost('/products', getProductsByCategory)

handleGet('/users', getUsers)
handleGet('/categories', getCategory)
handleGet('/products', getProduct)

connect().then(() => app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}))

