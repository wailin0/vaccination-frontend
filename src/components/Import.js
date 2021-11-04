import React, { useState } from "react";
import vaccinatedUserService from "../services/vaccinatedUser";
import formatImg from '../asset/images/format.jpg'
import excelFile from '../asset/excel/vaccineexcel.xlsx'

const Import = () => {

    const [file, setFile] = useState('')
    const [noti, setNoti] = useState({})

    const handleUpload = async (e) => {
        e.preventDefault()
        if(!file){
            setTimeout(() => {
                setNoti({})
            }, 3000);
            setNoti({ message: "Please upload an excel file", error: true })
            return
        }
        try {
            const formData = new FormData()
            formData.append('file', file)
            const uploadedFile = await vaccinatedUserService.excelUpload(formData)
            setTimeout(() => {
                setNoti({})
            }, 3000);
            setNoti(uploadedFile)
        } catch(error) {
            console.error(error)
            setTimeout(() => {
                setNoti({})
            }, 3000);
            setNoti({ message: "Please upload only an excel file", error: true })
        }
    }

    return (
        <div className="container">
            <div className="report-header">
                <span><span className="material-icons md-36">add_circle_outline</span><h2>Import</h2></span>
            </div>
            <div className="report-main">
                <article>
                    <form onSubmit={handleUpload} encType="multipart/form-data">
                        <label htmlFor="file">Enter Excel file :</label>
                        <input id="file" name="file" type="file" placeholder="Enter excel file" 
                                onChange={({target}) => setFile(target.files[0])}/>
                        <button type="submit" className="upload-btn">Upload</button>
                    </form>
                </article>
                <article>
                    <p>
                        Please <em>format</em> your excel file as shown <strong>below</strong>
                    </p>
                    <img src={formatImg} alt="excel format example" />
                    <p>
                        Or please download our sample excel file and fill each field respectively.
                    </p>
                    <a href={excelFile} className="download-btn" download="vaccineexcel.xlsx" >Sample excel file (Download sized: 5.5kB) </a>
                </article>
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

export default Import