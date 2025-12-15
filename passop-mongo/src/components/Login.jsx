import React, { useState } from 'react'

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!email || !password) throw new Error('Please enter email and password')
      localStorage.setItem('token', 'demo-token')
      onLoginSuccess && onLoginSuccess()
    } catch (err) {
      alert(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border rounded p-2 mb-3"
          type="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border rounded p-2 mb-4"
          type="password"
        />
        <button disabled={loading} className="w-full bg-green-500 text-white p-2 rounded">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login
