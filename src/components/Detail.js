import React, { useEffect, useState } from "react";
import vaccinatedUserServices from "../services/vaccinatedUser";
import { useParams, useRouteMatch } from 'react-router-dom'

const Detail = () => {
    const [ user, setUser ] = useState(null)
    const [qrcount, setQrcount] = useState(null)
    //http://localhost:3000/users/1?scan=true
    const params = useParams()

    useEffect(() => {
        vaccinatedUserServices.vaccinatedUser(params.id)
            .then(res => {
                setQrcount(res.data)
                setUser(res.data.vaccinateduser)
            }).catch(err => {
                console.log(err)
            })
    }, [params.id])

    const match = useRouteMatch('/users/:id/scaned')

    useEffect(() => {
        if(match && user) {
            console.log("matched")
            vaccinatedUserServices.incrCount(user.id, qrcount).then(res => console.log(res)).catch(err => console.log(err))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    if(!user) {
        return (
            <div>
                <em>Loading...</em>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="detail-container">
                <div>
                    <h2>VACCINATION ID</h2>
                </div>
                <div>
                    <span className="material-icons md-80">account_circle</span>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{user.username}</td>
                            </tr>
                            <tr>
                                <th>NRC</th>
                                <td>{user.nrc}</td>
                            </tr>
                            <tr>
                                <th>Date of birth</th>
                                <td>{user.dob}</td>
                            </tr>
                            <tr>
                                <th>Gender</th>
                                <td>{user.gender}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                <img src={user.qrcode} alt="qrcode" width="100"/>
                </div>
            </div>
        </div>
    )
}

export default Detail