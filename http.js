const { log } = require("console");
const Application = require('./framework/application')
const Router = require('./framework/router')

require("dotenv").config();
const PORT = process.env.PORT;

const app = new Application()
app.listen(PORT, () => log(`server started on port ${PORT}`))

const router = new Router();

router.get('/greeting', (req, res)=>{res.end('you are trying to visit greeting')})
router.get('/users', (req, res)=>{res.end('you are trying to create user')})

app.addRouter(router)