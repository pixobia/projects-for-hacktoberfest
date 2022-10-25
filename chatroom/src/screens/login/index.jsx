import React from 'react'

import { Container, Image, Text,} from '@chakra-ui/react'

export default function Login(props) {
  return (
    <>
         <Container display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} h={"200px"}>
                 <Text fontSize='3xl'>Continue with Google</Text>
                <Image
                onClick={props.loginHandler}
                mt={4}
                cursor={"pointer"}
                border="1px"
                borderRadius='full'
                boxSize='50px'
                src={require("../../assets/images/googleIcon.png")}
                alt='G'
                />
            </Container>
    </>
  )
}
