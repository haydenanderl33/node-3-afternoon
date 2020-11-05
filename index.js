require('dotenv').config()
const express = require('express')
const massive = require('massive')
const app = express();
const ctrl = require('./products_controller')

const {SERVER_PORT, CONNECTION_STRING} = process.env



massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
    }).then(db =>{
        app.set('db', db)
        console.log("I think that it's working")
}).catch(err => console.log(err));

app.use(express.json())

//ENDPOINTS
app.get('/api/products', ctrl.getAll);
app.get('/api/products/:id', ctrl.getOne);
app.put('/api/products/:id', ctrl.update);
app.post('/api/products', ctrl.create);
app.delete('/api/products/:id', ctrl.delete)


app.listen(SERVER_PORT, () => {
    console.log(`Server spinning up ma dude on ${SERVER_PORT}`)
})