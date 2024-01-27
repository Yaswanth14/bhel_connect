import React, {useState} from 'react'
import Layout from '../components/Layout/Layout'
import "../styles/AuthStyles.css"
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddProduct = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [link, setLink] = useState("")
    const navigate = useNavigate()


    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/user/addProduct`, {name: title, description, price, imageLink: link});
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/products/sale');
            } else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Oops.. Couldn\'t add');
        }
    }

  return (
    <Layout>
        <div className="form-container">
        <h4 className='title'>Sell a Product</h4>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Product Title</label>
                <input value={title} type="text" placeholder='Coffee Mug' className="form-control"
                onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <input value={description} type="text" placeholder='Mug that gets you unlimited coffee' className="form-control" 
                onChange={(e)=>setDescription(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Price</label>
                <input value={price} type="text" placeholder='99999' className="form-control"
                onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Image link</label>
                <input value={link} type="text" placeholder='mug.png' className="form-control"
                onChange={(e) => setLink(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
        </form>
        </div>
    </Layout>
  )
}

export default AddProduct