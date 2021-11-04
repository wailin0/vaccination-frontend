import React from "react";
import '../styles/alertBox.css'

const AlertBox = ({ show, hide, confirm }) => {
    
    return (
        <section className={ !show? "alert-container hide": 'alert-container show'}>
            <div>
                <h3>Confirmation</h3>
            </div>
            <div>
                <span>
                    Are you sure?
                </span>
            </div>
            <div>
                <button onClick={hide}>Cancel</button>
                <button onClick={confirm}>Confirm</button>
            </div>
        </section>
    )
}

export default AlertBox