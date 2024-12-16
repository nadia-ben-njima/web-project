import React from 'react'
import { Link } from 'react-router-dom';
function SignIn() {
return (
<div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        <form>
          <input type="email" placeholder="email..." />
          <input type="password" placeholder="password..." />
          <input type="password" placeholder="repeat password..." />
          <button type="submit">Sign In</button>
        </form>
      </div>
      
    </div>
    
)
}
export default SignIn