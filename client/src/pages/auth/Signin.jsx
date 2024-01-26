import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import "../../styles/AuthStyles.css"
import { useAuth } from '../../context/Auth'

const Signin = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [auth, setAuth] = useAuth()

  const navigate = useNavigate()

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${import.meta.env.VITE_API}/user/signin`, {username, password});
        if(res && res.data.success){
            toast.success(res.data.message);
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token
            })
            localStorage.setItem('auth', JSON.stringify(res.data));
            navigate('/');
        } else{
            toast.error(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(res.data.message);
    }
  }

  return (
    <Layout>
        <div className="form-container">
        <h4 className='title'>Login here</h4>
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
            <button type="submit" className="btn btn-primary">Login</button>
        </form>

        </div>
    </Layout>
  )
}

export default Signin