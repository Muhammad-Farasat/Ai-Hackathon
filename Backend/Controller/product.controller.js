import Product from '../Model/Product.js'
import User from '../Model/User.js'


export const allproduct =  async (req, res) => {
    try {
      let product = await Product.find({});
      res.send(product)
  
    } catch (error) {
      console.log("This is error: " + error);
      res.status(500).json({ error: "Internal Server Error" });
    }
} 

export const removeProduct = async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
      success: true,
      name: req.body.name,
    })
}

export const updateproduct =  async (req, res) => {
  
    const { id, name, price, sizes, images, category } = req.body
  
    await Product.findOneAndUpdate(
      { id: id },
      { name, price, images, sizes, category },
      { new: true }
    )
    console.log("It has been updated!!");
    res.json({
      success: true,
      message: "Product updated successfully",
      // product: updatedProduct,
    })
}

export const addProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    
    let id = 1;
    if (products.length > 0) {
      const last_product = products[products.length - 1];
      id = last_product.id + 1;
    }
    
    const product = new Product({
      id,
      name: req.body.name,
      images: req.body.images,
      price: req.body.price,
      sizes: req.body.sizes,
      category: req.body.category,
    });

    await product.save();



    res.json({
      success: true,
      name: product.name,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const newCollection = async(req, res)=>{
    let product = await Product.find({})
    let newCollection = product.slice(1).slice(-8)
    res.send(newCollection)
}

export const popularWomen = async(req, res)=>{
    let product = await Product.find({category:'Women'})
    let popWomen = product.slice(0,4)
    res.send(popWomen)
  
  
}




