const express = require('express')
const app = express()
const PORT = 8080
//Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.listen(PORT, () => {console.log(`Server Running on PORT: ${PORT}`)})

// server

let productos = [
    { id: 1 , titulo: 'Notebook ASUS X515' , precio: 1000 , stock: 100 , marca: 'ASUS'},
    { id: 2 , titulo: 'Monitor SAMSUNG' , precio: 600 , stock: 50 , marca: 'SAMSUNG'},
    { id: 3 ,titulo: 'Auriculares X10 SAMSUNG' , precio: 100 , stock: 500 , marca: 'SAMSUNG'},
    { id: 4 ,titulo: 'Microfono FIFINE' , precio: 200 , stock: 20, marca: 'FIFINE' }
]

// endpoints
//RESPUESTA GET
app.get( '/', (req , res ) => {
    res.json({productos})
})
app.get('/:marca', (req , res) => {
    let selectMarca = req.params.marca
    let show = productos.filter( e => e.marca === selectMarca)
    res.json({show})
})
//RESPUESTA POST
app.post( '/post', (req,res) => {
    let {titulo, precio, stock, marca }= req.body
    const newProducto = { id: productos.length + 1, titulo: titulo, precio: precio, stock: stock, marca: marca}; // Crear un nuevo producto con la estructura correcta
    productos.push(newProducto)
    console.log(newProducto)
    res.status(201).json(newProducto)
})

//RESPUESTA PUT
app.put( '/put/:id', (req,res) => {
    const productoID = parseInt(req.params.id)
    let producto = productos.find(e => e.id === productoID);
    console.log(producto)
    if (!producto) {
        return res.status(404).send('No existe ese producto');
    } else {
        const { titulo, precio, stock, marca } = req.body;
        producto.titulo = titulo;
        producto.precio = precio;
        producto.stock = stock;
        producto.marca = marca;

        res.status(200).json(producto);
    }
});

//RESPUESTA DELETE
app.delete( '/delete/:id', (req,res) => {
    let productoID = parseInt(req.params.id)
    let producto = productos.filter(e => e.id !== productoID);
    res.json({msg: `Producto ${productoID} eliminado `});
    productos = producto

})