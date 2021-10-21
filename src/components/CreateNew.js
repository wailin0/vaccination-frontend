import React from "react";
import { Link } from 'react-router-dom'

const CreateNew = () => {
    return (
        <div className="container">
            <div className="new-header">
                <span><span className="material-icons md-36">add_circle_outline</span><h2>Create New</h2></span>
            </div>
            <div className="new-main">
                <Link to="/urls/create" className="new-btn">
                    <span className="material-icons md-36 btn-logo">add_circle_outline</span><span style={{marginInlineStart: 30}}>Create Url</span>
                </Link>
                <Link to="/customers/create" className="new-btn">
                    <span className="material-icons md-36 btn-logo">add_circle_outline</span><span style={{marginInlineStart: 30}}>Create Customer</span>
                </Link>
            </div>
            <div className="new-footer">
                <button className="new-btn">Next</button>
            </div>
        </div>
    )
}

export default CreateNew