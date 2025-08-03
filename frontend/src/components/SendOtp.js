import React, { useState } from 'react';

const SendOtp = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://your-backend-url.onrender.com/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('OTP sent successfully!');
      } else {
        setMessage(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error sending OTP');
    }
  };

  return (
    <div className="otp-container">
      <h2>Send OTP to Email</h2>
      <form onSubmit={sendOtp}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SendOtp;
