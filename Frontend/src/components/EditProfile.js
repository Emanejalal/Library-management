import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct named impor

import user from '../images/user.png'; // Import the logo image

const EditProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.id);
                setFirstName(decodedToken.firstName);
                setLastName(decodedToken.lastName);
                setEmail(decodedToken.email);
            } catch (error) {
                console.error('Failed to decode token:', error);
            }
        }
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('IDDDDDDDDDDDDD',userId)
            const response = await fetch(`http://localhost:8084/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ firstName, lastName, email })
            });
            if (response.ok) {
                console.log('User profile updated successfully');
            } else {
                console.error('Failed to update user profile');
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };



    return (
        <div className="bg-opacity-60 backdrop-filter backdrop-blur-lg w-full max-w-4xl flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] mx-auto mt-24 rounded-lg">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link
                href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
                rel="stylesheet"
            />
            <style>
                {`
                        body {
                            font-family: 'Plus Jakarta Sans', sans-serif;
                        }
                    `}
            </style>
            <main className="w-full py-1 ">
                <div className="p-2 md:p-4">
                    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg mx-auto">
                        <h2 className="pl-6 text-2xl text-white font-bold sm:text-xl">Public Profile</h2>
                        <div className="grid max-w-2xl mx-auto mt-8">
                            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                                <img
                                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                    src={user}
                                    alt="Bordered avatar"
                                />
                                <div className="flex flex-col space-y-5 sm:ml-8">
                                    <button
                                        type="button"
                                        className="px-7 text-base font-medium text-indigo-100 focus:outline-none bg-slate-600 rounded-lg border border-indigo-200 hover:bg-slate-800 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                    >
                                        Change picture
                                    </button>
                                    <button
                                        type="button"
                                        className="px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                    >
                                        Delete picture
                                    </button>
                                </div>
                            </div>
                            <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                    <div className="w-full">
                                        <label
                                            htmlFor="first_name"
                                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                        >
                                            Your first name
                                        </label>
                                        <input
                                            type="text"
                                            id="first_name"
                                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                            placeholder="Your first name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label
                                            htmlFor="last_name"
                                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                        >
                                            Your last name
                                        </label>
                                        <input
                                            type="text"
                                            id="last_name"
                                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                            placeholder="Your last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-2 sm:mb-6">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"

                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        placeholder="your.email@mail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button onClick={handleSubmit}
                                        type="submit"
                                        className="text-white bg-slate-700 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-slate-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EditProfile;
