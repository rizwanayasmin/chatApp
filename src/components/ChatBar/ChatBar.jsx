import React, { useState } from 'react'
import './ChatBar.css'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {  format } from 'date-fns'


const useStyles = makeStyles((theme) => ({
    
    small: {
        width: 28,
        height: 28,
        fontSize: 12,
        fontWeight: 'bold'
    },
    iconbutton_css:{
        backgroundColor:"#1e90ff",
        color:"#fff",
        width: '1.7em',
        height: '1.7em',
        '&:hover':{
            backgroundColor:"#1e90ff!important",
            color:"#fff"
        }
    }
    
  }));

const ChatBar = (props) =>{
    const classes = useStyles();
    const[message, setMessage] = useState('')
    const sendMessage=()=>{
        setTimeout(()=>{
            setMessage('');
        })
        props.sendMessage&&props.sendMessage(message);
    }
    const handleKeyDown = (event) => {
        if (!event.shiftKey&&event.key === 'Enter'&&message) {
            sendMessage();
       
        }
      }
    return(
        <div className='chatbar_header'>
                <div className="chatbox_div">
                    {props.conversationList&&props.conversationList.length>0&&props.conversationList.map((obj,index)=>{
                        return(
                            <React.Fragment key={`conv_index_${index}`}>
                                {obj.sender===props.senderid? <div className='sender_head'>
                            <label className='sender_title'>{obj.msg}
                            <span>{format(new Date(obj.timestamp),'hh:mm a')}</span>
                            </label>
                           
                            <Avatar className={classes.small}>{props.s_name.charAt(0).toUpperCase()}</Avatar>
                           
                        </div>
                        :
                          <div className='receiver_head'>
                            <Avatar className={classes.small}>{props.r_name.charAt(0).toUpperCase()}</Avatar>
                            <label className='receiver_title'>{obj.msg}
                            <span>{format(new Date(obj.timestamp),'hh:mm a')}</span>
                            </label>
                        
                        </div>}
                            </React.Fragment>
                        )
                    })}
                       

                      
                    </div>
                    <div className='chatbar_footer'>
                        <Card>
                            <div className='chatbar_footer_section'>
                                <div className='footer_textarea'><TextareaAutosize
                                onChange={(e)=>setMessage(e.target.value)}
                                value={message}
                                rowsMax={3}
                                onKeyDown={handleKeyDown}
                                aria-label="maximum height"
                                placeholder="Enter Your Message"/>
                                </div>
                                <div>
                                <IconButton onClick={()=>sendMessage()} disabled={!message}  size="medium" aria-label="delete" className={[classes.margin,classes.iconbutton_css]}>
                                <SendIcon fontSize="medium" />
                                </IconButton>
                                </div>
                            </div>
                        </Card>
                    </div>
        </div>

    )
}

export default ChatBar