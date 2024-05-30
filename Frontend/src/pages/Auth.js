import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

const host = process.env.REACT_APP_HOST_DOM  || 'http://localhost:5000';

const Auth = () => {
    const [login, setLogin] = useState(false);
    const history = useNavigate();
    console.log(host)
    // ------------login----------------------

    const [LoginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    // Event handler for email input
    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const loginFunc = async (e) => {
        e.preventDefault();
        console.log({
            email: LoginData.email,
            password: LoginData.password
        })
        try {
            const response = await fetch(`${host}/api/auth/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: LoginData.email,
                    password: LoginData.password
                })
            });
            const responseData = await response.json();
            console.log(responseData);

            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to login');
            }

            // Check the success flag returned from the server
            if (!responseData.Success) {
                throw new Error('Invalid credentials. Please try again.');
            }

            // Assuming successful login
            const authToken = responseData.AUTH_TOKEN;
            console.log(authToken);
            localStorage.setItem('authToken', authToken);
            // Store authToken or perform any other necessary action
            alert('Login successful!');
            history('/')

        } catch (error) {
            console.error('Error logging in:', error.message);
            alert(error.message || 'Failed to login. Please try again later.');
        }
    };


    // signUP --------------------

    const [SignUpData, setSignUpData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    // Event handler for email input
    const handleChange_Signup = (e) => {
        const { id, value } = e.target;
        setSignUpData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const signUpFunc = async (e) => {
        e.preventDefault();
        console.log(SignUpData);
        try {
            // ${host}/api/auth/CreatUSER
            const response = await fetch(`${host}/api/auth/CreatUSER`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: SignUpData.name,
                    email: SignUpData.email,
                    password: SignUpData.password
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create user.');
            }

            const data = await response.json();
            const { AUTH_TOKEN, Success } = data;

            alert('Signup successful!');
            // Assuming you have a way to store AUTH_TOKEN, such as localStorage
            localStorage.setItem('AUTH_TOKEN', AUTH_TOKEN);
            history('/');
        } catch (error) {
            console.error('Error signing up:', error.message);
            alert(error.message || 'Failed to signup. Please try again later.');
        }
    };


    return (
        <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center">

            {!login ?
                <div className="w-full flex flex-wrap">
                    <div className="w-full md:w-1/2 flex flex-col">

                        <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                            {/* <Link to="/" className="bg-black text-white font-bold text-xl p-4">Logo</Link> */}
                        </div>

                        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                            <p className="text-center text-3xl">Welcome.</p>
                            <form onSubmit={loginFunc} className="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
                                <div className="flex flex-col pt-4">
                                    <label htmlFor="email" className="text-lg">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="your@email.com"
                                        value={LoginData.email}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3
                                         text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                <div className="flex flex-col pt-4">
                                    <label htmlFor="password" className="text-lg">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        value={LoginData.password}
                                        onChange={handleChange}
                                        name="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                <input

                                    type="submit"
                                    value="Log In"
                                    className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
                                />
                            </form>
                            <div className="text-center pt-12 pb-12">
                                <p>Don't have an account? <p onClick={() => { setLogin(!login) }} href="register.html" className=" cursor-pointer underline font-semibold">Register here.</p></p>
                            </div>
                        </div>

                    </div>


                    <div className="w-1/2 shadow-2xl">
                        <img className="object-cover w-full h-screen hidden md:block" src="https://cdn.worldvectorlogo.com/logos/kids-world-1.svg" />
                    </div>
                </div>

                :
                <div className="w-full flex flex-wrap">

                    <div className="w-full md:w-1/2 flex flex-col">

                        <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
                            {/* <a href="#" className="bg-black text-white font-bold text-xl p-4" alt="Logo">Logo</a> */}
                        </div>
                        <div className="flex flex-col mt-[100px] justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                            <p className="text-center text-3xl">Join Us.</p>
                            <form className="flex flex-col pt-3 md:pt-8" onSubmit={signUpFunc}>
                                <div className="flex flex-col pt-4">
                                    <label htmlFor="name" className="text-lg">Name</label>
                                    <input type="text" id="name" placeholder="John Smith" value={SignUpData.name} onChange={handleChange_Signup} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>

                                <div className="flex flex-col pt-4">
                                    <label htmlFor="email" className="text-lg">Email</label>
                                    <input type="email" id="email" placeholder="your@email.com" value={SignUpData.email} onChange={handleChange_Signup} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>

                                <div className="flex flex-col pt-4">
                                    <label htmlFor="password" className="text-lg">Password</label>
                                    <input type="password" id="password" placeholder="Password" value={SignUpData.password} onChange={handleChange_Signup} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>

                                <div className="flex flex-col pt-4">
                                    <label htmlFor="confirm-password" className="text-lg">Confirm Password</label>
                                    <input type="password" id="confirmPassword" placeholder="Password" value={SignUpData.confirmPassword} onChange={handleChange_Signup} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>

                                <input type="submit" value="Register" className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" />
                            </form>
                            <div className="text-center pt-12 pb-12">
                                <p>Already have an account? <span onClick={() => { setLogin(!login) }} className="underline cursor-pointer font-semibold">Log in here.</span></p>
                            </div>
                        </div>

                    </div>


                    <div className="w-1/2 shadow-2xl">
                        <img className="object-cover w-full h-screen hidden md:block" src="https://cdn.worldvectorlogo.com/logos/kids-world-1.svg" alt="Background" />
                    </div>
                </div>

            }
        </section>
    );
};

export default Auth;