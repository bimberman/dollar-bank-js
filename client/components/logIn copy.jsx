import React from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Image,
  Input,
  VStack
} from '@chakra-ui/react';

export default function LogIn() {

  return (
    <>
      <VStack marginTop="15%">
        <Image
          src="./images/logo.png"
          h="20%"
          w="20%"
          alt="logo"
          margin="auto" />
        <VStack>
          <form>
            <FormControl id="uid">
              <FormLabel>UserId</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <FormControl id="helper">
              <FormHelperText>Please enter your user information above</FormHelperText>
            </FormControl>
          </form>
        </VStack>
      </VStack>

    </>
  );
}
