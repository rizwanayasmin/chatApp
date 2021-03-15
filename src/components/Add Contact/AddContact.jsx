import React, { useState } from 'react'
import './AddContact.css'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NearMeIcon from '@material-ui/icons/NearMe';
import { Formik,Field } from 'formik';
import * as Yup from 'yup';

 

 
const AddContact = (props) =>{
    const [userDetails,setuserDetails]=useState(null);
    
    return(
        <div className='addcontact_parent'>
            <div>
                <div className='addcontact_section'>
                     <Formik

                            initialValues={{ name: props.edit?props.edit.name:'', phonenumber: props.edit?props.edit.phonenumber:'', email: props.edit?props.edit.emailId:'',company:props.edit?props.edit.company:'' }}

                            validationSchema={Yup.object({

                                name: Yup.string()
                                .required('Required'),

                                phonenumber: Yup.string().min(10,"Please Enter 10 digit mobli number").required('Required'),

                                email: Yup.string().email('Invalid email address').required('Required'),

                                company: Yup.string()

                                .required('Required'),

                            })}

                            onSubmit={(values, { setSubmitting }) => {
                                props.sendFormDatas&&props.sendFormDatas(values);
                            }}

                            >

                            {({handleSubmit,setFieldValue,getFieldProps,touched,errors,values}) => (

                                <form onSubmit={handleSubmit}>
                                    <Grid container >
                                        <Grid item xs={12} lg={12}>
                                        
                                            <div>
                                                <label htmlFor="name"> Name</label>

                                                    <Field
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    />

                                                    {touched.name && errors.name ? (

                                                    <div className="errors_div">{errors.name}</div>

                                                    ) : null}
                                            </div>
                                        </Grid>
                                        {!props.edit&&
                                        <Grid item xs={12} lg={12}>
                                        
                                            <div>
                                            <label htmlFor="phonenumber">Phone Number</label>

                                                <Field

                                                id="phonenumber"

                                                type="text"
                                                value={values.phonenumber}
                                                onChange={(e)=>e.target.value.length<=10&&setFieldValue('phonenumber',e.target.value.replace(/[^0-9]/g,''))}
                                                name="phonenumber"

                                                />

                                                {touched.phonenumber && errors.phonenumber ? (

                                                <div className="errors_div">{errors.phonenumber}</div>

                                                ) : null}
                                            </div>
                                            
                                        </Grid>
                        }
                                        <Grid item xs={12} lg={12}>
                                        <label htmlFor="email">Email Address</label>

                                            <Field id="email" type="email" name="email" />

                                            {touched.email && errors.email ? (

                                            <div className="errors_div">{errors.email}</div>

                                            ) : null}
                                        </Grid>
                                        <Grid item xs={12} lg={12}>
                                        <label htmlFor="company"> Company</label>
                                            <Field
                                            name="company"
                                            id="company"
                                            type="text"
                                            />

                                            {touched.company && errors.company ? (

                                            <div className="errors_div">{errors.company}</div>

                                            ) : null}

                                        </Grid>

                                    </Grid>

                                {!props.edit ? (
                                                    <div className='addcontact_footer'>
                                                    <Button type="submit"
                                                        variant="contained"
                                                        endIcon={<NearMeIcon />}>
                                                            submit
                                                    </Button>
                                                </div>

                                                ):(
                                                <div className='addcontact_footer'>
                                                    <Button type="submit"
                                                        variant="contained"
                                                        endIcon={<NearMeIcon />}>
                                                            Update
                                                    </Button>
                                                </div>
                                                )}

                                </form>

                            )}

                        </Formik>
                    </div>
            </div>
        </div>
    )
}

export default AddContact