import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../helpers/Constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        try {
            e.preventDefault();
            const response = await axios.post(`${serverUrl}/v1/users/login`, {
                email,
                password
            });
            // console.log(response.data);
            // // window.sessionStorage.setItem("id",response.data.data.user._id)
            window.localStorage.setItem("id",response.data._id)
            window.localStorage.setItem("name",response.data.fullName)
            // window.localStorage.removeItem("id")
            // navigate('/');
            // console.log(response.data._id);
            if(response.data._id === undefined){
              navigate('/login')
              window.localStorage.removeItem("id")
              window.localStorage.removeItem("name")
              toast.error("Invalid Credentials");
              toast.error("User not found");
            }
            else{
              navigate('/');
              toast.success("Logged in successfully")
            } 
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?{' '}
            <Link
              to={'/signup'}
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>
          <form action="#" method="POST" className="mt-8" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    id='email'
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    id='password'
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Get started <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
