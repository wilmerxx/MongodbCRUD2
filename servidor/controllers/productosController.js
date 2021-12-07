const Producto = require("../models/Producto");


exports.crearProducto = async (req, res) => {
   try {
    let producto;
    //creamos el producto registro
    producto = new Producto(req.body);

    await producto.save();
    res.send(producto);
    

   } catch (error) {
       console.log(error);
       res.status(500).send('Hubo un error');
   }
}

exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos)
    } catch (error) {
        console.log(error);
       res.status(500).send('Hubo un error');
    }
}

exports.actualizarProducto = async (req, res) => {
    try {
        const {cliente,animal,raza,sexo,nacimiento,direccion,telefono} = req.body;
        let producto = await Producto.findById(req.params.id);

        if (!producto){ 
            res.status(404).json({ msg: 'No existe el producto'})
        }
        producto.cliente = cliente;
        producto.animal = animal;
        producto.raza = raza;
        producto.sexo = sexo;
        producto.nacimiento = nacimiento;
        producto.direccion = direccion;
        producto.telefono = telefono;

        producto = await Producto.findOneAndUpdate({_id: req.params.id},producto, {new:true})
        res.json(producto);

    } catch (error) {
        console.log(error);
       res.status(500).send('Hubo un error');
    }
}

exports.obtenerProducto = async (req, res) => {
    try {
        
        let producto = await Producto.findById(req.params.id);

        if (!producto){ 
            res.status(404).json({ msg: 'No existe el producto'})
        }
        res.json(producto);

    } catch (error) {
        console.log(error);
       res.status(500).send('Hubo un error');
    }
}

exports.eliminarProducto = async (req, res) => {
    try {
        
        let producto = await Producto.findById(req.params.id);

        if (!producto){ 
            res.status(404).json({ msg: 'No existe el producto'})
        }
        await Producto.findByIdAndRemove({_id: req.params.id})

        res.json({msg: 'Registro eliminado con éxito'});

    } catch (error) {
        console.log(error);
       res.status(500).send('Hubo un error');
    }
}