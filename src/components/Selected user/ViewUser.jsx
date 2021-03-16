import React from 'react';
import './ViewUser.css'
import Grid from '@material-ui/core/Grid';



const ViewUser=(props)=>{
    return(
        <div className="view_contactlist">
            <Grid container>
                <Grid item xs={6} lg={6}>
                        <div>
                        <div className='view_contact_list_section_head'><label className='view_contact_list_section'>Name</label></div>
                        <div className='view_contact_list_section_head'><label className='view_contact_list_section'>Phone Number</label></div>
                        <div className='view_contact_list_section_head'><label className='view_contact_list_section'>Email Id</label></div>
                        <div className='view_contact_list_section_head'><label className='view_contact_list_section'>Company</label></div>
                        </div>

                </Grid>
                <Grid item xs={6} lg={6}>
                    <div>
                    <div className='view_contact_list_section_head'><label>{props.view.name}</label></div>
                    <div className='view_contact_list_section_head'><label>{props.view.phonenumber}</label></div>
                    <div className='view_contact_list_section_head'><label>{props.view.emailId}</label></div>
                    <div className='view_contact_list_section_head'><label>{props.view.company}</label></div>
                    </div>
                </Grid>
               
            </Grid>
        </div>
    )

}

export default ViewUser