import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import "../styles/ProductsStyles.css"

const MyProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
      axios.get(`${import.meta.env.VITE_API}/user/myOrders`).then((res) => {
      setProducts(res.data.products);
      });
  }, []);
  
  return (
    <Layout>
        <div className="container my-5">
        {products.map((product, index) => (
        <div key={index} className="product-container">
          <div className="image-container">
            <img src={product.imageLink} className="img-fluid rounded-start" alt={product.name} />
          </div>
          <div className="details-container">
            <h5>{product.name}</h5>
            <p>{product.description}</p>
            <p>Price: Rs. {product.price}</p>
          </div>
        </div>
      ))}
        </div>
    </Layout>
  )
}

export default MyProducts