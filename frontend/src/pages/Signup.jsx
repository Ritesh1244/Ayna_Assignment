// import React, { useState } from 'react';  

// function Signup() {  
//     const [signupInfo, setSignupInfo] = useState({  
//         name: "",  
//         email: "",  
//         password: ""  
//     });  

//     const handleChange = (e) => {  
//         // const { name, value } = e.target;  
//         const name = e.target.value 
//         console.log("name is", name); 
        
//         // Update the corresponding state based on input name  
//         // setSignupInfo(prevInfo => ({  
//         //     ...prevInfo,  
//         //     [name]: value // This sets the appropriate key in state to the new value  
//         // }));  
//     };  

//     // console.log("signup data is ",signupInfo)
//     return (  
//         <div>  
//             <h1>Signup</h1>  
//             <form>  
//                 {/* Name */}  
//                 <div>  
//                     <label htmlFor='name'>Username:</label>  
//                     <input  
//                         onChange={handleChange}  
//                         type='text'  
//                         id='name'  
//                         name='name' // Make sure this matches the state key  
//                         placeholder='Enter your username'  
//                         value={signupInfo.name} // Controlled input  
//                     />  
//                 </div>  

//                 {/* Email */}  
//                 <div>  
//                     <label htmlFor='email'>Email</label>  
//                     <input  
//                         // onChange={handleChange}  
//                         type='email'  
//                         id='email'  
//                         name='email' // Make sure this matches the state key  
//                         placeholder='Enter your email'  
//                         // value={signupInfo.email} // Controlled input  
//                     />  
//                 </div>  

//                 {/* Password */}  
//                 <div>  
//                     <label htmlFor='password'>Password</label>  
//                     <input  
//                         // onChange={handleChange}  
//                         type='password'  
//                         id='password'  
//                         name='password' // Ensure this matches the state key  
//                         placeholder='Enter your password'  
//                         // value={signupInfo.password} // Controlled input  
//                     />  
//                 </div>  
//             </form>  
//         </div>  
//     );  
// }  

// export default Signup;




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        username: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prevInfo => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:1337/api/auth/local/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupInfo)
            });

            const data = await response.json();

            if (data.jwt) {
                handleSuccess("Signup successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 1000); // ✅ Redirect to Login
            } else {
                handleError(data.error?.message || "Signup failed. Try again.");
            }
        } catch (error) {
            handleError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Signup</h1>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input onChange={handleChange} type="text" name="username" placeholder="Enter Your name..."
                            value={signupInfo.username} required className="w-full border-b-2 border-gray-300 outline-none py-2 focus:border-purple-600"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input onChange={handleChange} type="email" name="email" placeholder="Enter Your email..."
                            value={signupInfo.email} required className="w-full border-b-2 border-gray-300 outline-none py-2 focus:border-purple-600"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input onChange={handleChange} type="password" name="password" placeholder="Enter Your password..."
                            value={signupInfo.password} required className="w-full border-b-2 border-gray-300 outline-none py-2 focus:border-purple-600"/>
                    </div>
                    <button type="submit"
                        className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition duration-200">
                        Signup
                    </button>
                </form>

                <p className="text-sm text-gray-600 mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-purple-700 hover:underline">Login</Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Signup;
