import React, { useState } from 'react'
import './ContactList.css'
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ChatIcon from '@material-ui/icons/Chat';
import Tooltip from '@material-ui/core/Tooltip';




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
    const {selectedUser, currentUser}=props;

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
        <ListItemAvatar>
        <Tooltip title="View Contact Details">
          <Avatar onClick={()=>props.viewcontact&&props.viewcontact()} >{props.details.name.charAt(0).toUpperCase()}</Avatar>
        </Tooltip>
        </ListItemAvatar>
        <ListItemText
          primary={
              <div className='contactlist_label_head'>
                  <label onClick={()=>props.sendContact&&props.sendContact()} className='contactlist_label'>{name}</label>
                  <div>
                  <Tooltip title="Edit Contact">
                    <EditIcon onClick={()=>props.editDetails&&props.editDetails()}/>
                    </Tooltip>
                    </div>
                  { currentUser && 
                  <div className='chat_icon'>
                     <Tooltip title="Start Chat">
                    <ChatIcon onClick={()=>props.sendContact&&props.sendContact()}/>
                    </Tooltip>
                    </div>
                  }
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
    </div>
    )

}

export default ContactList