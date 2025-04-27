'use client';

import { leagueSpartan } from "@/lib/font";
import LoginHeader from "../parts/LoginHeader";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const requirements = 'Must contain at least 8 characters';
  const requirements2 = 'Include one special character';
  const spclchars = ['+', '-', '!', '@', '#', '$', '%', '^', '&', '*', '_', '+'];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passMessage, setPassMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const containsSpecialChar = spclchars.some((char) => value.includes(char));

    if (value.length === 0) {
      setPassMessage('');
    } else if (value.length < 5) {
      setPassMessage('Very Short');
    } else if (value.length >= 5 && !containsSpecialChar && value.length < 8) {
      setPassMessage('Medium');
    } else if (value.length >= 8 && !containsSpecialChar) {
      setPassMessage('Strong');
    } else if (value.length >= 8 && containsSpecialChar) {
      setPassMessage('Very Strong');
    }

    validateForm(value);
  };

  const validateForm = (passwordValue) => {
    const isPasswordValid = passwordValue.length >= 8;
    const isEmailValid = email.includes('@') && email.includes('.');
    const isNameValid = name.trim().length > 0;

    setIsFormValid(isPasswordValid && isEmailValid && isNameValid);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    validateForm(password);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateForm(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.msg || 'Registration failed');
        return;
      }

      setSuccessMessage('Registration successful! Now you can log in.');
      setName('');
      setEmail('');
      setPassword('');
      setPassMessage('');
      setErrorMessage('');
    } catch (err) {
      console.error('Error:', err);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const lengthRequirementClass = password.length >= 8 ? 'text-green-500' : 'text-yellow-500';
  const specialCharRequirementClass = spclchars.some((char) => password.includes(char)) ? 'text-green-500' : 'text-yellow-500';

  return (
    <div className="flex flex-col min-h-screen">
      <LoginHeader />
      <div className="flex-1 flex items-center justify-center bg-gray-900">
        <div className={`w-full max-w-sm mo:m-4 ${leagueSpartan.className} bg-gray-800 p-8 shadow-[#18032b] rounded-3xl shadow-2xl`}>
          <h1 className="text-3xl font-bold text-center text-[#AE00F9] mb-6">Register</h1>
          {successMessage ? (
            <div className="text-center">
              <p className="text-green-500">{successMessage}</p>
              <Link href="/login">
                <button className="mt-4 py-2 px-4 bg-purple-700 text-white rounded-lg">
                  Go to Login
                </button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-7">
                <div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    maxLength={50}
                    required
                    onChange={handleNameChange}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 bg-gray-700 text-white border border-transparent rounded-lg focus:outline-none focus:border-purple-700"
                  />
                </div>
                <div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    maxLength={50}
                    required
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 bg-gray-700 text-white border border-transparent rounded-lg focus:outline-none focus:border-purple-700"
                  />
                </div>
                <div>
                  <input
                    id="password"
                    value={password}
                    required
                    onChange={handlePasswordChange}
                    type="password"
                    placeholder="Create Password"
                    className="w-full px-3 py-2 bg-gray-700 text-white border border-transparent rounded-lg focus:outline-none focus:border-purple-700"
                  />
                </div>
              </div>

              <div className="flex flex-col my-2 gap-2">
                <p
                  className={`${passMessage === 'Very Short'
                      ? 'text-red-500'
                      : passMessage === 'Medium'
                        ? 'text-yellow-500'
                        : passMessage === 'Strong'
                          ? 'text-orange-500'
                          : 'text-green-500'
                    }`}
                >
                  {passMessage}
                </p>
                <p className={`${lengthRequirementClass}`}>{password.length > 0 && requirements}</p>
                <p className={`${specialCharRequirementClass}`}>{password.length > 0 && requirements2}</p>
              </div>

              {errorMessage && <p className="text-red-500">{errorMessage}</p>}

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-2 bg-[#AE00F9] hover:bg-purple-800 text-white font-bold rounded-lg transition duration-300 ${!isFormValid ? 'cursor-not-allowed opacity-50' : ''
                  }`}
              >
                Register
              </button>
            </form>
          )}
          {!successMessage && (
            <Link href="/login">
              <p className="text-center text-gray-300 mt-4 hover:text-purple-700 cursor-pointer">
                Already have an account? Sign In
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}