import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <nav>
            <div className="logo-container">
                <div className="logo">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="logo-content">
                    <h3>Dashboard</h3>
                    <Link to="/" style={{color: "#71C8F9"}}>View Forntend</Link>
                </div>
            </div>
            <div className="navbar-container">
                <ul>
                    <li>
                        <Link to="/new">
                            <span className="material-icons md-36">add_circle_outline</span><span className="navbar-content">Create </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/customers">
                            <span className="material-icons md-36">person</span><span className="navbar-content">User Management</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/customers/create">
                            <span className="material-icons md-36">qr_code_2</span><span className="navbar-content">QR Generator</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <span className="material-icons md-36">summarize</span><span className="navbar-content">Report</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar