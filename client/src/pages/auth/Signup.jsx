import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import "../../styles/AuthStyles.css"

const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    // Form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/user/signup`, {username, password});
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/signin');
            } else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Error signing up!');
        }
    }
    
  return (
    <Layout>
        <div className="form-container">
        <h4 className='title'>Register here</h4>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input value={username} type="email" placeholder='sample@xyz.com' className="form-control"
                onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input value={password} type="password" placeholder='secret' className="form-control" 
                onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        </div>
    </Layout>
  )
}

export default Signup