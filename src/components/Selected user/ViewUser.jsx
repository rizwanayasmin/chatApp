import React from 'react';
import './ViewUser.css'


const ViewUser=(props)=>{
    return(
        <div >
            <div className='viewuser_parent'>
                <label>Name</label>
                <p>{props.view.name}</p>
            </div>
            <div className='viewuser_parent'>
                <label>Phone Number</label>
                <p>{props.view.phonenumber}</p>
            </div>
            <div className='viewuser_parent'>
                <label>Email Id</label>
                <p>{props.view.emailId}</p>
            </div>
            <div className='viewuser_parent'>
                <label>Company</label>
                <p>{props.view.company}</p>
            </div>
        </div>
    )

}

export default ViewUser