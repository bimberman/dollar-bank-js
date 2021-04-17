import React from 'react';
import {
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  VStack
} from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function LogIn() {

  return (
    <>
      <VStack marginTop="5%">
        <Image
          src="./images/logo.png"
          h="10vh"
          w="10vh"
          alt="logo"
          margin="auto" />
        <VStack>
          <form>
            <InputGroup mb="5%">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em">
                <FontAwesomeIcon icon={faUser} />
              </InputLeftElement>
              <Input type="text" placeholder="User Id" />
            </InputGroup>
            <InputGroup mb="5%">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em">
                <LockIcon color="gray.300" />
              </InputLeftElement>
              <Input type="password" placeholder="Password" autoComplete="true" />
            </InputGroup>
          </form>
        </VStack>
      </VStack>

    </>
  );
}
