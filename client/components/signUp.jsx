import React from 'react';
import {
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  VStack
} from '@chakra-ui/react';

import {
  PhoneIcon,
  LockIcon
} from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignature, faUser } from '@fortawesome/free-solid-svg-icons';

export default function SignUp() {

  return (
    <>
      <VStack mt="5%">
        <Image
          src="./images/logo.png"
          h="10vh"
          w="10vh"
          alt="logo"
          margin="auto" />
        <VStack mt="15%">
          <form >
            <InputGroup mb="5%">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em">
                <FontAwesomeIcon icon={faSignature} />
              </InputLeftElement>
              <Input type="text" placeholder="First Name" />
            </InputGroup>
            <InputGroup mb="5%">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em">
                <FontAwesomeIcon icon={faSignature} />
              </InputLeftElement>
              <Input type="text" placeholder="Last Name" />
            </InputGroup>
            <InputGroup mb="5%">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em">
                <FontAwesomeIcon icon={faHome} />
              </InputLeftElement>
              <Input type="text" placeholder="Address" />
            </InputGroup>
            <InputGroup mb="5%">
              <InputLeftElement pointerEvents="none">
                <PhoneIcon color="gray.300" />
              </InputLeftElement>
              <Input type="tel" placeholder="Phone number" />
            </InputGroup>
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
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em">
                $
                </InputLeftElement>
              <Input type="number" placeholder="Enter amount" />
            </InputGroup>
          </form>
        </VStack>
      </VStack>
    </>
  );
}
