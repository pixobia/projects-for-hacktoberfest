import React,{useState, useEffect, useRef} from 'react'

import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth"
import {app} from "../../firebase"
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy} from "firebase/firestore"

import { Box, Container, Button, HStack, VStack, Text, Input, Image} from '@chakra-ui/react'

import Message from './components/Message'
import Login from '../login'

export default function Chatting() {

    const auth = getAuth(app)
    const db = getFirestore(app)

    const [user, setUser] = useState(false)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

   const divForScroll = useRef(null)

    const loginHandler = ()=>{
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }

    const logoutHandler = ()=>{
        signOut(auth)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        if(message!==""){
        try {

            setMessage("")

            await addDoc(collection(db,"Messages"),{
                text: message,
                uid: user.uid,
                username: user.displayName,
                uri:user.photoURL,
                createdAt:serverTimestamp()
            })
            
            divForScroll.current.scrollIntoView({behavior: "smooth"})

            
        } catch (error) {
            alert(error)
        }
    }}

    const clearMessages = async ()=>{
        if(message==="#delete"){
            try {
                setMessages([])
            } catch (error) {
                console.log(error)
            }
            
        }
    }

    useEffect(() => {

        const q = query(collection(db,"Messages"),orderBy("createdAt","asc"))

      const unSubscribe = onAuthStateChanged(auth, (data)=>{
        setUser(data);
      })

      const unSubscribeForMessage = onSnapshot (q,(snap)=>{
        setMessages(snap.docs.map((item)=>{
            const id = item.id;
            return {id, ...item.data()}
        }))
      })

      return () => {
        unSubscribe()
        unSubscribeForMessage()
      }

    },[])

    useEffect(() => {
        divForScroll?.current?.scrollIntoView({behavior: "smooth"})
    }, [messages,user])
    

    document.onkeydown = checkKey;

    function checkKey(e) {
  
      e = e || window.event;
      if (e.keyCode == '13') {
        submitHandler(e);
        
      }
  
    }

    const mediaQuery = window.matchMedia("(max-width: 550px)");

  return (
    <>
        <Box display='flex' bg={'red.50'} h={mediaQuery.matches ?"90vh":"100vh"} alignItems='center'>
            {user?
            <Container p={mediaQuery.matches ?0:''} bg={"white"} h={mediaQuery.matches ?'100%':'80%'}>
                <HStack display='flex' my={4} justifyContent='center' position={"relative"}>
                    <Image
                    onClick={clearMessages}
                    position={"absolute"}
                    left={"10px"}
                    borderRadius='full'
                    boxSize='70px'
                    src={require("../../assets/images/icon.png")}
                    alt='G'
                    />
                    <Text as='cite' color={"#004a77"} fontSize='3xl'>Chatroom</Text>
                    <Button onClick={logoutHandler} colorScheme='red' position={"absolute"} right={'10px'}>Logout</Button>
                </HStack>

                <VStack p={2} h={'80%'} w={'full'} overflowY={'auto'} bg={'blue.100'} css={{"&::-webkit-scrollbar":{
                    display: "none",
                }}}>
                    {
                        messages?.map((item)=>(
                            <Message 
                                key={item.id}
                                text={item.text} 
                                user={item.uid===user.uid?"me":"other"}
                                uri={item.uri}
                                username={item.username}
                                createdAt={item.createdAt}
                            />
                        )
                        )
                    }
                    <div ref={divForScroll}></div>
                </VStack>
                
                <HStack mt={"10px"}>
                    <Input value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder='Type a message' />
                    <Button onClick={submitHandler} colorScheme='green'>Send</Button>
                </HStack>
            </Container>
            :
           <Login loginHandler={loginHandler}/>
        }
        </Box>
    </>
  )
}
