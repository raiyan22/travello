import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser(ev){
        ev.preventDefault();
        try {
            await axios.post('/login', {email, password});
            alert('Login success!');
        } catch(e) {
            alert('Login failed');
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                
                <h1 className="text-4xl text-center pb-5"> Login</h1>
                
                <form className="max-w-md mx-auto" onSubmit={loginUser}>

                <input type="email" 
                        placeholder="your@email.com"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)} />

                    <input type="password" 
                        placeholder="password" 
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)} />

                    <button className="primary">Login</button>
                    <div className="text-center py-3 text-gray-400">
                        Don't have an account yet? 
                        <Link className="font-semibold px-1 text-black" to={'/register'}>
                            Register
                        </Link>
                    </div>
                </form>
            
            </div>
        </div>
    );
}