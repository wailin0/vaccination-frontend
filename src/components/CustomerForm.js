import React, { useState, useEffect } from "react";
import { setToken } from "../services/vaccinatedUser";
import vaccinatedUserService from "../services/vaccinatedUser";

const CustomerForm = () => {

    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ nrc, setNrc ] = useState('')
    const [ dob, setDob ] = useState('')
    const [ gender, setGender ] = useState('')
    const [ address, setAddres ] = useState('')
    const [ vaccineFirstDate, setVaccineFirstDate ] = useState('')
    const [ vaccineSecondDate, setVaccineSecondDate ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ note, setNote ] = useState('')

    const [noti, setNoti] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if(loggedUserJSON) {
          const result = JSON.parse(loggedUserJSON)
          setToken(result.accessToken)
        }
    }, [])

    const handleForm = async () => {
        let newVaccinatedUser = {
            username: `${firstName} ${lastName}`,
            nrc, dob, gender, address, vaccineFirstDate, vaccineSecondDate, phone, note
        }
        try {
            const result = await vaccinatedUserService.createVaccinatedUser(newVaccinatedUser)
            setNoti(result.message)
            setTimeout(() => {
                setNoti(null)
            }, 3000);

        } catch(error) {
            console.error(error)
        }
    }

    return (
        <div className="container">
            <div className="form-header">
                <span><span className="material-icons md-36">add_circle_outline</span><h2>Create Customer</h2></span>
            </div>
            <div className="form-main">
                <section>
                    <h3><span className="material-icons md-36 info">info</span> Your information</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name :</label>
                            <div className="name-input">
                                <input id="name" name="first-name" type="text" placeholder="first name"
                                    value={firstName} onChange={({target}) => setFirstName(target.value)}
                                />
                                <input name="last-name" type="text" placeholder="last name"
                                    value={lastName} onChange={({target}) => setLastName(target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nrc">NRC :</label>
                            <input id="nrc" name="nrc" type="text" placeholder="Enter your NRC number" 
                                value={nrc} onChange={({target}) => setNrc(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Date of birth :</label>
                            <input id="dob" name="dob" type="date" placeholder="your date of birth" 
                                value={dob} onChange={({target}) => setDob(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender :</label>
                            <select id="gender" name="gender" value={gender} onChange={({target}) => setGender(target.value)} >
                                <option value="">Enter your gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address :</label>
                            <input id="address" name="address" type="text" placeholder="Enter your address"
                                value={address} onChange={({target}) => setAddres(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="vaccineFirstDate">Vaccinated first date :</label>
                            <input id="vaccineFirstDate" name="vaccineFirstDate" type="date" placeholder="your vaccinated first date (mm/dd/yyyy)" 
                                value={vaccineFirstDate} onChange={({target}) => setVaccineFirstDate(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="vaccineSecondDate">Vaccinated second date :</label>
                            <input id="vaccineSecondDate" name="vaccineSecondDate" type="date" placeholder="your vaccinated second date (mm/dd/yyyy)" 
                                value={vaccineSecondDate} onChange={({target}) => setVaccineSecondDate(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Phone :</label>
                            <input id="phone" name="phone" type="tel" placeholder="enter your phone number" 
                                value={phone} onChange={({target}) => setPhone(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="node">Note :</label>
                            <textarea id="node" value={note} onChange={({target}) => setNote(target.value)}></textarea>
                        </div>
                    </form>
                    <div className="generator-group">
                        <span className="material-icons md-36 form">qr_code_2</span>
                        <button onClick={handleForm} className="btn">QR Generator</button>
                    </div>
                </section>
            </div>
            {
                noti && <p className="noti">{noti}</p>
            }
        </div>
    )
}

export default CustomerForm