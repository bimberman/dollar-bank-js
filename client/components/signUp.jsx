import React, { useState } from 'react';
import {
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Label,
  VStack
} from '@chakra-ui/react';
import {
  PhoneIcon,
  LockIcon
} from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignature, faUser } from '@fortawesome/free-solid-svg-icons';
import { usePostNewUser } from '../hooks/useUser';

export default function SignUp(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isValidPass, setIsValidPass] = useState(true);

  const handleInputChange = e => {
    setUser({
      ...user,
      [e.target.dataset.field]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (user) {
      setIsLoading(true);
      const res = await usePostNewUser(user);
      if (res.ok) {
        // eslint-disable-next-line no-console
        console.log(res.ok);
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('user ID or password were not provided');
    }
  };

  const handlePasswordInputChange = e => {
    const password = e.target.value;
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}\]:;',?/*~$^+=<>]).{8,}$/;

    if (regex.test(password)) {
      setIsValidPass(true);
      setUser({
        ...user,
        [e.target.dataset.field]: e.target.value
      });
    } else {
      setIsValidPass(false);
    }
  };

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
          <form onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <InputGroup mb="1vh">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em">
                <FontAwesomeIcon icon={faSignature} />
              </InputLeftElement>
              <Input type="text" placeholder="First Name" onChange={handleInputChange} data-field="fName" />
            </InputGroup>
            <InputGroup mb="1vh">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em">
                <FontAwesomeIcon icon={faSignature} />
              </InputLeftElement>
              <Input type="text" placeholder="Last Name" onChange={handleInputChange} data-field="lName" />
            </InputGroup>
            <InputGroup mb="1vh">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em">
                <FontAwesomeIcon icon={faHome} />
              </InputLeftElement>
              <Input type="text" placeholder="Address" onChange={handleInputChange} data-field="address" />
            </InputGroup>
            <InputGroup mb="1vh">
              <InputLeftElement pointerEvents="none">
                <PhoneIcon color="gray.300" />
              </InputLeftElement>
              <Input type="tel" placeholder="Phone number" onChange={handleInputChange} data-field="phone" />
            </InputGroup>
            <InputGroup mb="1vh">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em">
                <FontAwesomeIcon icon={faUser} />
              </InputLeftElement>
              <Input type="text" placeholder="User Id" onChange={handleInputChange} data-field="userId" />
            </InputGroup>
            <InputGroup mb="1vh">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em">
                <LockIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="password"
                placeholder="Password"
                autoComplete="true"
                onChange={handlePasswordInputChange}
                data-field="password"
                errorBorderColor="red.300"
                isInvalid={!isValidPass}/>
            </InputGroup>
            <InputGroup mb="1vh">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em">
                $
                </InputLeftElement>
              <Input type="number" placeholder="Enter amount" onChange={handleInputChange} data-field="amount" />
            </InputGroup>
            <Button
              isLoading={isLoading}
              loadingText="Submitting"
              bg="white"
              w="50%"
              mx="auto"
              color="brand.100"
              variant="outline"
              _hover={{
                bg: 'brand.100',
                color: 'white'
              }}
              _focus={{
                boxShadow: 'none'
              }}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </VStack>
      </VStack>
    </>
  );
}
