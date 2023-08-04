import React,{useState,useEffect} from 'react'
import client,{ COLLECTION_ID_MESSAGES, DATABASE_ID, databases } from '../appWrite-config'
import {ID,Query,Role,Permission} from "appwrite"
import { Trash2 } from 'react-feather'
import Header from '../components/Header'
import { useAuth } from '../utils/AuthContext'


const Room = () => {

const {user } = useAuth()


const[messages,setMessages]=useState([])
const [messageBody,setMessageBody]=useState('')

    useEffect(() => {
        getMessages()

       const unsubscribe= client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
    // Callback will be executed on changes for documents A and all files.
    console.log('realtime',response);
    if(response.events.includes("databases.*.collections.*.documents.*.create")){
      console.log("a message was created!")

      setMessages(prevState=>[response.payload,...prevState])

    }

     if(response.events.includes("databases.*.collections.*.documents.*.delete")){
      console.log("a message was deleted!")

      // const filteredMessages=messages.filter(message=>message.$id !==response.payload.$id)
      // console.log(filteredMessages.length)
      // setMessages(filteredMessages)
      setMessages(prevState=>messages.filter(message=>message.$id!==response.payload.$id))
    }
});

return()=>{
  unsubscribe()
}
    },[messages.length])

const handleSubmit = async(e)=>{
  e.preventDefault()
  let payload ={
    user_id:user.$id,
    username:user.name,
    body:messageBody
  }

  let permissions= [
    Permission.write(Role.user(user.$id))
  ]

  let response= await  databases.createDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, ID.unique(), payload,permissions)

  console.log("created",response)
  // setMessages(prevState=>[response,...messages])

  setMessageBody(' ')
}

    const getMessages=async()=>{
        const response= await databases.listDocuments(DATABASE_ID,COLLECTION_ID_MESSAGES,
          [
            Query.orderDesc('$createdAt'),
            Query.limit(20)
  ])
        console.log(response)
        setMessages(response.documents)
    }

const deleteMessage=async(message_id)=>{
   databases.deleteDocument(DATABASE_ID,COLLECTION_ID_MESSAGES, message_id);
  //  setMessages(prevState=>messages.filter(message=>message.$id!==message_id))

}

  return (
    <main className='container'>
<Header/>
      <div className="room--container">
        

<form id='message--form' onSubmit={handleSubmit} >
  <div>
    <textarea  required name="" id=""  maxLength="1000" placeholder='Say something...'
    onChange={(e)=>{setMessageBody(e.target.value)}}
    value={messageBody}>

    </textarea>
  </div>

  <div className='send-btn--wrapper'>
    <input className='btn btn--secondary' type="submit" value="Send" />
  </div>
</form>

      <div>
        {messages.map(message => (
            <div key={message.$id} className='message--wrapper'>
                <div className='message--header'>
                  <p>
                    {message?.username?(
                      <span>{message.username}</span>
                    ):(
                      <span>Anonymous User</span>
                    )}
                  </p>
                    <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>

{message.$permissions.includes(`delete("user:${user.$id}")`) && (<Trash2
                    className='delete--btn'
                     onClick={()=>deleteMessage(message.$id)}/>
                    )
}

                    
                </div>

                <div className='message--body'>
                    <span>{message.body}</span>
                </div>
                </div>
        ))}
      </div>
      </div>
    </main>
  )
}

export default Room
