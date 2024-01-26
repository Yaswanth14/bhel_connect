import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify'

const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // Form function
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        toast.success('Registered Successfully');
    }
    
  return (
    <Layout>
        <div className="signup">
        <h1>Register here</h1>
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