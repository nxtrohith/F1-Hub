'use client';
import React, { useState } from "react";

const BookEvent = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => (
            setSubmitted(true)
        ), 1000)
    }

  return (
    <div id="book-event" className="mt-4">
      {submitted ? (
        <p className="text-sm text-red-500">Your slot is Booked!!</p>
      ):(
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="email" className="block text-white font-medium">Email Address:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    placeholder="Enter your email address"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                />
            </div>

            <button className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200">
                Submit
            </button>
        </form>
      )}
    </div>
  )
}

export default BookEvent
