const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './process.env') })
const conectToMongo = require("./db")
const Express = require("express")
const saveDataToMongoDB = require('./GetData')

conectToMongo();


// to get data from faker in ur data base then  only
// saveDataToMongoDB(); 

var cors = require('cors');
const { send } = require('process');
const app = Express()

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'auth-token'],
};

app.use(cors(corsOptions));

const port = process.env.PORT || 5000


app.use(Express.json())
// availabe rotes
app.get('/', function (req, res) {
    console.log("/user request called");
    res.send('welcome to abhishek backend backend').status(200);
});
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/wishlist', require('./routes/wishlist'))


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})



