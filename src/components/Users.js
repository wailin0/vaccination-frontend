import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import vaccinatedUserService, { setToken } from "../services/vaccinatedUser";

const User = () => {

    const [ users, setUsers ] = useState([])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if(loggedUserJSON) {
          const result = JSON.parse(loggedUserJSON)
          setToken(result.accessToken)
        }
    }, [])

    useEffect(() => {
        vaccinatedUserService.vaccinatedUsers()
            .then( async res => {
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="container">
            <div className="customer-container">
                <ul>
                    {
                        users.map(user => (
                            <li key={user.id}>
                                <div>
                                    <span>{user.vaccinateduser.username}</span>
                                    <time>
                                        <span className="material-icons md-36 time">history</span>
                                        <span className="date">Sep 25,2021</span>
                                    </time>
                                </div>
                                <p><a href="www.vaccinationregister.com.mm">{user.vaccinateduser.url ? user.vaccinateduser.url: "www.vaccinationregister.com.mm" }</a></p>
                                <div>
                                    <span className="counts">{user.times}</span><span>Scans</span>
                                </div>
                                <Link to={`/users/${user.vaccinateduser.id}`} className="detail-link">Detail</Link>
                                <div>
                                    <img src={user.vaccinateduser.qrcode} alt="qrcode"/>
                                </div>
                                <div>
                                    <button className="download-btn">Download</button>
                                    <div>
                                        Edit | Delete
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default  User