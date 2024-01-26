import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import "../styles/ProductsStyles.css"
import { toast } from 'react-toastify'

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
      axios.get(`${import.meta.env.VITE_API}/user/products`).then((res) => {
      setProducts(res.data.products);
      });
  }, []);

  const handleBuyProduct = async (productId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/user/buyProduct`, { _id: productId });

      // Handle the response
      if (response.status === 200) {
        // Handle success (e.g., show a success message)
        toast.success('Product purchased successfully!');
      } else {
        // Handle error (e.g., show an error message)
        toast.error('Failed to purchase product.');
      }
    } catch (error) {
      // Handle network error or other issues
      console.error('An error occurred while making the purchase request:', error);
    }
  };
  
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
          <div className="button-container">
            <button className="btn btn-success" onClick={() => handleBuyProduct(product._id)}>Buy Product</button>
          </div>
        </div>
      ))}
        </div>
    </Layout>
  )
}

export default Products