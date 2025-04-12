import React from "react";
import logo from "./../../src/logo.png";

function Header() {
  return (
    <header>
        <div className="header-container p-4">
            <a href="/" className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                Mind<span>Stream</span>
            </a>
            
            {/* <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Courses</a></li>
                    <li><a href="#">Explore</a></li>
                    <li><a href="#">Resources</a></li>
                    <li><a href="#">About Us</a></li>
                </ul>
            </nav> */}
            
            <div className="auth-buttons">
                <button className="btn btn-outline">Sign Up</button>
                <button className="btn btn-primary">Login</button>
            </div>
        </div>
    </header>
  );
}

export default Header;
