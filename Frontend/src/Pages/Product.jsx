import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import { ShopContext } from '../Context/ShopContext';
import Footer from '../Components/Footer/Footer';



function Product() {

  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=> e._id===productId)
// console.log(e._id === productId)
  
  return (
    <>
      <ProductDisplay product={product} />
      <Footer />
    </>
  )
}

export default Product