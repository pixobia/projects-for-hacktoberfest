import React from 'react'
import Moment from 'react-moment';
import {HStack, Avatar, VStack, Text } from '@chakra-ui/react'

export default function Message({text, uri, user='other', username, createdAt}) {
  return (
    <>
    <HStack bg={"gray.100"} maxWidth={"75%"} p={2} borderRadius={"25px"} alignSelf={user==='me'?'flex-end':"flex-start"}>
        <Avatar src={uri}/>
        <VStack>
          <HStack mr={2} >
            <Text as='b' fontSize='md' color={"#00780f"}>{username}</Text>
            <Text as='i' fontSize='xs' color={"gray"}> <Moment fromNow>{new Date(createdAt?.seconds*1000)}</Moment></Text>
          </HStack>
          <Text mr={2} fontSize='lg'>{text}</Text>
        </VStack>
    </HStack>
    </>
  )
}
