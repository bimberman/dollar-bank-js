import React from 'react';
import {
  Image,
  Text,
  VStack
} from '@chakra-ui/react';

export default function User(props) {
  const { user } = props;

  return (
    <>
      <VStack mt="5vh">
        <Image
          src="./images/logo.png"
          h="10vh"
          w="10vh"
          alt="logo"
          margin="auto" />
        <VStack mt="3vh">
          <Text fontSize="35px" color="brand.100" mb="1vh">
            User: {user.userId}
          </Text>
          <Text fontSize="35px" color="brand.100" mb="1vh">
            Name: {`${user.fName || ''} ${user.lName || ''}`}
          </Text>
          <Text fontSize="35px" color="brand.100" mb="1vh">
            Address: {user.address}
          </Text>
          <Text fontSize="35px" color="brand.100" mb="1vh">
            Phone: {user.phone}
          </Text>
          <Text fontSize="35px" color="brand.100" mb="1vh">
            Balance: {user.balance}
          </Text>
        </VStack>
      </VStack>
    </>
  );
}
