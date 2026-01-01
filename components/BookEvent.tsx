'use client';
import React, { useState } from "react";

const BookEvent = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Replace with your actual API endpoint
        fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        .then(res => {
            if (res.ok) {
                setSubmitted(true);
            } else {
                // Handle error appropriately
                console.error('Booking failed');
            }
        })
        .catch(err => console.error('Booking error:', err));
    }
  return (
    <div id="book-event" className="mt-4">
      {submitted ? (
        <p className="text-sm text-green-500">Your spot is Booked!!</p>
      ):(
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="email" className="block text-white font-medium">Email Address:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    required
                    aria-required="true"
                    placeholder="Enter your email address"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                />            </div>

            <button className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200">
                Submit
            </button>
        </form>
      )}
    </div>
  )
}

export default BookEvent
