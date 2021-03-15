import React, { useState } from 'react'
import './ContactList.css'
// material ui
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import AddContact from '../Add Contact/AddContact'
import Modal from '@material-ui/core/Modal';





const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));
const ContactList = (props)=>{
    const classes = useStyles();
    const {name,emailId,company,phonenumber}=props.details;
    const {selectedUser}=props;
    const [modal, setModal] = useState([])

    const handleOpen = () => {
      setModal(true);
    };
  
  const handleClose = () => {
    setModal(false);
    }; 
    return(
        <div className={`contactlist_parent ${selectedUser?(selectedUser.phonenumber==phonenumber?'selected_contact_active':''):''}`} >

 
      <ListItem alignItems="flex-start">
        <ListItemAvatar onClick={()=>props.sendContact&&props.sendContact()}>
          <Avatar  >{props.details.name.charAt(0).toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
              <div className='contactlist_label_head'>
                  <label onClick={()=>props.sendContact&&props.sendContact()} className='contactlist_label'>{name}</label>
                  <EditIcon onClick={()=>props.editDetails&&props.editDetails()}/>
              </div>
          }
          secondary={
              <React.Fragment>
                  <p onClick={()=>props.sendContact&&props.sendContact()} className='contactlist_para'>{company}</p>
                  <p onClick={()=>props.sendContact&&props.sendContact()} className='contactlist_para'>{emailId}</p>
              </React.Fragment>
          }
        >
        
        </ListItemText>

      </ListItem>
      <Divider variant="inset" component="li" />
     
            {/* <Card>
                <Divider />
                {/* <div className='header'>
                    <div>  <Avatar>A</Avatar></div> */}

                    {/* <div className='contactlist'>
                        <div className='contactlist_section_name'><label>Name</label>
                        <EditIcon />
                        </div>
                        <div className='contactlist_section'><label>Email</label></div>
                        <div className='contactlist_section'><label>Company Name</label></div>
                    </div> */}
                {/* </div> */}
               
                {/* <div className='contactlist'>
                    <div className='contactlist_section_name'><label>Name</label>
                    <EditIcon />
                    </div>
                    <div className='contactlist_section'><label>Email</label></div>
                    <div className='contactlist_section'><label>Company Name</label></div>
                </div> */}
         
         {/* <Modal
                open={modal}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
          >
              <AddContact />
          </Modal> */}
        </div>
    )

}

export default ContactList