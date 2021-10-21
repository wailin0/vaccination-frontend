import React from 'react'
import profile_image from '../asset/images/profile.jpg'

const Headerbar = ({ username, handleLogout }) => {

    return (
        <header>
            <div>
                <h1>Admin Dashboard </h1>
            </div>
            <div>
                <span>{username}</span>
                <div className="profile-container">
                    <img src={profile_image} alt="profile" />
                    <button onClick={handleLogout} className="logout-btn">Log out</button>
                </div>
            </div>
        </header>
    )
}

export default Headerbar