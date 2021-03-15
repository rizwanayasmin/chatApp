import React,{useState} from 'react'
import './Topbar.css'
// component  import
import ContactList from '../Contact List/ContactList'
import ChatBar from '../ChatBar/ChatBar'
import AddContact from '../Add Contact/AddContact'
// antd
import 'antd/dist/antd.css';
// material ui
import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import dataList from '../../data/contactList.json'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import chatLogo from '../../images/chat_logo.jpg'
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
// select
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from '@material-ui/core'
import ViewUser from '../../components/Selected user/ViewUser'
import Card from '@material-ui/core/Card';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';


const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));





const options = [
    { value: 'Angali' },
    { value: 'Bala' },
    { value: 'Catherine' },
    { value: 'Darel' },
    { value: 'Eniya' },
  ];

const Topbar =()=>{
    const classes = useStyles();
    // const[age, setAge] = useState('')
    const [name, setName] = useState('');
    const [OpenSelect ,setOpenSelect] = useState('')
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [userDetails, setUserDetails] = useState([...dataList])
    const [cloneuserDetails, setCloneUserDetails] = useState([...dataList])
    const [selectedUser, setSelectedUser] = useState(null)
    const [conversation, setConversation] = useState(null)
    const [currentUser, setCurrentUser] = useState(null);
    const [editdetails,seteditdetails] = useState(null);
    const [communication, setCommunication] = useState([]);
    const [currentconverstation,setcurrentconversation] = useState(null);
    const [openSelectedUser, setOpenSelectedUser] = useState(false)
    const [viewcontactdetails,setviewcontactdetails] = useState(null);
    const [showContact, setShowContact] = useState(true)
    const [showChat, setShowChat] = useState(false)


    const handleChange = (event) => {
        setName(event.target.value);
      };
      const editcontactDetails=(data)=>{
        seteditdetails(data);
        setOpen(true);
      }
    const handleOpen = () => {
      seteditdetails(null);
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
        seteditdetails(null);
      };  
// 
const handleOpenSelectedUser = (data) => {
  setOpenSelectedUser(true);
  setviewcontactdetails(data?data:selectedUser)
  };

const handleCloseSelectedUser = () => {
  setOpenSelectedUser(false);
  };  
// select
const handleOpenSelect = () => {
    setOpenSelect(true);
  };

const handleCloseSelect = () => {
    setOpenSelect(false);
  };
  
// menu
const handleClick = (event) => {
  filterDatas('');
    setAnchorEl(event.currentTarget);
  };
const getconversation=(senderid,receiverid,instantcommunication)=>{
  if(senderid&&receiverid){
    var getFilterConverstation=instantcommunication?[...instantcommunication]:[...communication];
    // console.log("conv",getFilterConverstation);
  var filteredRecords=getFilterConverstation.filter((msgobj)=>((senderid==msgobj.sender&&receiverid==msgobj.receiver)||(receiverid==msgobj.sender&&senderid==msgobj.receiver)))
  setcurrentconversation(filteredRecords);
  }
}
  const handleCloseMenu = (data) => {
      if(data){
        // setSelectedUser(data);
        setCurrentUser(data);
        getconversation(data.phonenumber,selectedUser?selectedUser.phonenumber:null);
      }
    setAnchorEl(null);
  };
  const sendContactDetails=(data)=>{
      if(!currentUser){
          setCurrentUser(data);
      }else{
        getconversation(currentUser?currentUser.phonenumber:null,data.phonenumber);
        setSelectedUser(data);
        setShowContact(false);
        setShowChat(true)
      }
  }
  const receiveFormDatas=(details)=>{
    const mycontactdetails=[...userDetails];
    var editobj={
      name:details.name,
      phonenumber:details.phonenumber,
      emailId:details.email,
      company:details.company
    }
    var getindex= mycontactdetails.findIndex((obj)=>obj.phonenumber==editobj.phonenumber);
    if(editdetails){
     if(getindex!=-1){
      mycontactdetails[getindex]=editobj;
     }
    }else{
      if(getindex!=-1){
        alert("moblie number already exsist...")
        return;
      }else{
        mycontactdetails.unshift(editobj)
      }
    }
    alert(editdetails?'Contact Updated Successfully':'Contact Added Successfully');
    setUserDetails(mycontactdetails);
    setCloneUserDetails(mycontactdetails);
    seteditdetails(null);
    setOpen(false);
  }
  const sendMessage=(msg)=>{
    var updatecommunication=[...communication];
    var msgdata={sender:currentUser.phonenumber,receiver:selectedUser.phonenumber,msg:msg,timestamp:new Date().getTime()};
    updatecommunication.push(msgdata);
    console.log("updatecom",updatecommunication)
    setCommunication(updatecommunication);
      getconversation(msgdata.sender,msgdata.receiver,updatecommunication);
  }
  const filterDatas=(data)=>{
    const getfilterdata=[...cloneuserDetails].filter((obj)=>obj.name.includes(data)||obj.company.includes(data))
    setUserDetails(getfilterdata);
  }
  console.log("currentconverstation",currentconverstation);
    return(
        <div className={`topbar_parent ${showChat?'showchat':'hidechat'}`}>
          <div className='topbar_grid_container_head'>
              <Grid container>
                  <Grid className="first_div" item xs={3} lg={3}>

                  {/* <div className='one'>
                    <div className='two'> */}
                  <h5 className='topbar_title'>Chat Application</h5>
                  <div className='add_content'>
                        <div className='auto_search'>
                            <Paper component="form" className={classes.root}>
                                <InputBase
                                onChange={(e)=>filterDatas(e.target.value)}
                                    placeholder="Search"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                />
                                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                                </IconButton> 
                                <Divider className={classes.divider} orientation="vertical" />
                  <div className="add_circle_style"><IconButton color="primary" className={classes.iconButton} aria-label="directions">
                    <AddCircleIcon onClick={handleOpen}/>
                  </IconButton></div>  
                            </Paper>
                    </div>
                    </div>
                    <div className='topbar_list_header'>
                    <List >
                        {userDetails.map((data,index)=>{
                            const iscontactavailable=(selectedUser&&data.phonenumber==selectedUser.phonenumber)||(currentUser&&data.phonenumber==currentUser.phonenumber)
                            return(
                                <React.Fragment>
                                {iscontactavailable?null:
                                <ContactList viewcontact={()=>handleOpenSelectedUser(data)} selectedUser={selectedUser} editDetails={()=>editcontactDetails(data)} sendContact={()=>sendContactDetails(data)} key={`contact_${index}`} details={data}/>}
                                </React.Fragment>
                                )
                        }
                        
                        )}
                        {/* <ContactList usercontact={userDetails}/>
                        <ContactList />
                        <ContactList />
                        <ContactList />
                        <ContactList /> */}
                        </List> 
                        </div>
                    {/* </div> 
                    <div className='three' style={{backgroundImage:`url(${chatLogo})`,width:'100%'}}> */}
                  </Grid>
                  <Grid className="second_div" item xs={9} lg={9} style={{backgroundImage:`url(${chatLogo})`,width:'100%'}}>
                      {(selectedUser||currentUser) ? 
                      <div className='topbar_grid_two_main'>
                        <div className='header_two'>
           

            <FormControl className={classes.formControl}>
           <div className="flex_top_header">
            <div className='topbar_header_two_section'>
                {selectedUser&&
                    <React.Fragment>
                          <Avatar >{selectedUser.name.charAt(0).toUpperCase()}</Avatar>
            <p className='para'>{selectedUser.name}</p>
                    </React.Fragment>
                }
          
            </div>
            <div className='topbar_header_two_section'  onClick={handleClick}>
            {currentUser&&
                    <React.Fragment>
                          <Avatar>{currentUser.name.charAt(0).toUpperCase()}</Avatar>
            <p className='para'>{currentUser.name}</p>
                    </React.Fragment>
                }
            </div>
            </div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={()=>handleCloseMenu()}
                >
                    {userDetails.map((user,keyuser)=>{
                         const iscontactavailable1=(selectedUser&&user.phonenumber==selectedUser.phonenumber)||(currentUser&&user.phonenumber==currentUser.phonenumber)
                        return(
                            <React.Fragment>
                           {iscontactavailable1?null:<MenuItem value={user.name} key={`userkey_${keyuser}`} onClick={()=>handleCloseMenu(user)}>{user.name}</MenuItem>} 
                           </React.Fragment>
                        )
                    })}
        </Menu>
      </FormControl>
     
            </div>
                    {selectedUser&&
                      <ChatBar s_name={currentUser&&currentUser.name} r_name={selectedUser&&selectedUser.name} senderid={currentUser&&currentUser.phonenumber} conversationList={currentconverstation} sendMessage={(msg)=>sendMessage(msg)} />}
                      </div>
                      :   <div className="nonselecteduser">
                        <ChatIcon />
                        {/* <Card>
                        <p className="select_user_and_chat">Please Select the user and start the chat</p>
                        </Card> */}
                         
                          </div>}
                  </Grid>
               
              </Grid>
              {/* </div>
              </div> */}
          </div>
        <div className='dialog'>
          <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}
          maxWidth="xs"
          >
            <DialogTitle className="dialog_form_title">
            {
                        !editdetails ? <div className='addcontact_title_head'><label className='addcontact_title'>Add Contact</label></div> 
                        :
                        <div className='addcontact_title_head'><label className='addcontact_title'>Edit Contact</label></div>
                    }
            </DialogTitle>
          <DialogContent className="dialog_form_content">
          <AddContact  sendFormDatas={(details)=>receiveFormDatas(details)} edit={editdetails} />
          </DialogContent>
          </Dialog>
          </div>

          <Dialog onClose={handleCloseSelectedUser} aria-labelledby="simple-dialog-title" open={openSelectedUser}
          >
            <DialogTitle>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  View Selected User Details
                  <CloseIcon onClick={handleCloseSelectedUser}/>
              </div>
            </DialogTitle>
            <Divider />
            <DialogContent>
           
                    {viewcontactdetails&&
                    <ViewUser view={viewcontactdetails}/>
                    } 
            </DialogContent>
          </Dialog>
        </div>
    )
}

export default Topbar