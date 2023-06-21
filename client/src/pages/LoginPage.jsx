import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                
                <h1 className="text-4xl text-center pb-5"> Login</h1>
                
                <form className="max-w-md mx-auto">
                    <input type="email" placeholder="your@email.com" />
                    <input type="password" placeholder="password" />
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