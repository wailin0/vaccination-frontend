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
    const [ profile, setProfile ] = useState('')

    const [noti, setNoti] = useState({})

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if(loggedUserJSON) {
          const result = JSON.parse(loggedUserJSON)
          setToken(result.accessToken)
        }
    }, [])

    const handleForm = async (e) => {
        e.preventDefault()
        if(!profile||!dob||!nrc||!address||!vaccineFirstDate||!phone){
            setTimeout(() => {
                setNoti({})
            }, 3000);
            setNoti({ message: "Enter required field!", error: true })
            return
        }
        let newVaccinatedUser = {
            username: `${firstName} ${lastName}`,
            nrc, dob, gender, address, vaccineFirstDate, vaccineSecondDate, phone, note
        }
        try {
            const formData = new FormData()
            formData.append('file', profile)
            const uploadedFile = await vaccinatedUserService.imageUpload(formData)
            if(uploadedFile.error === true) {
                setTimeout(() => {
                    setNoti({})
                }, 3000);
                setNoti(uploadedFile)
                return
            }
            newVaccinatedUser = { ...newVaccinatedUser, profile: uploadedFile.file.filename }
            const result = await vaccinatedUserService.createVaccinatedUser(newVaccinatedUser)
            setTimeout(() => {
                setNoti({})
            }, 3000);
            setNoti({message: result.message, error: false})
            setFirstName('')
            setLastName('')
            setNrc('')
            setDob('')
            setGender('')
            setAddres('')
            setVaccineFirstDate('')
            setVaccineSecondDate('')
            setPhone('')
            setNote('')
            setProfile('')
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <div className="container">
            <div className="form-header">
                <span><span className="material-icons md-36">add_circle_outline</span><h2>Create New</h2></span>
            </div>
            <div className="form-main">
                <section>
                    <h3><span className="material-icons md-36 info">info</span> Your information</h3>
                    <form onSubmit={handleForm} id="customer-form" encType="multipart/form-data">
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
                        {/* accept="image/*" */}
                        <div className="form-group">
                            <label htmlFor="profile">Profile :</label>
                            <input id="profile" name="profile" type="file" required placeholder="Enter your image" 
                             onChange={({target}) => setProfile(target.files[0])} accept="image/*"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nrc">NRC :</label>
                            <input id="nrc" name="nrc" type="text" required placeholder="Enter your NRC number" 
                                value={nrc} onChange={({target}) => setNrc(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Date of birth :</label>
                            <input id="dob" name="dob" type="date" required placeholder="your date of birth" 
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
                            <input id="address" name="address" required type="text" placeholder="Enter your address"
                                value={address} onChange={({target}) => setAddres(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="vaccineFirstDate">Vaccinated first date :</label>
                            <input id="vaccineFirstDate" name="vaccineFirstDate" required type="date" placeholder="your vaccinated first date (mm/dd/yyyy)" 
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
                            <input id="phone" name="phone" type="tel" required placeholder="enter your phone number" 
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
                        <button type="submit" form="customer-form" className="btn">QR Generate</button>
                    </div>
                </section>
            </div>
            {
                noti.error === false && <p className="noti">{noti.message}</p>
            }
            {
                noti.error === true && <p className="noti err">{noti.message}</p>
            }
        </div>
    )
}

export default CustomerForm