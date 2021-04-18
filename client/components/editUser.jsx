import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack
} from '@chakra-ui/react';
import {
  PhoneIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon
} from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignature, faUser } from '@fortawesome/free-solid-svg-icons';
import { usePutUpdateUser } from '../hooks/useUser';

export default function EditUser(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [isValidPass, setIsValidPass] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

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
      const updatedUser = user;
      updatedUser.id = props.user.id;
      const res = await usePutUpdateUser(updatedUser);
      if (res) {
        setIsLoading(false);
      }
    }
  };

  const handlePhoneInputChange = e => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    if (formattedNumber) {
      e.target.value = formattedNumber;
      setUser({
        ...user,
        [e.target.dataset.field]: formattedNumber
      });
    }
  };

  const formatPhoneNumber = phoneNumberString => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
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

  const handleViewPass = e => {
    setShowPassword(!showPassword);
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
              <Input type="tel" placeholder="Phone number" onChange={handlePhoneInputChange} data-field="phone" />
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
              <InputGroup >
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em">
                  <LockIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  autoComplete="true"
                  onChange={handlePasswordInputChange}
                  data-field="password"
                  errorBorderColor="red.300"
                  isInvalid={!isValidPass} />
                <InputRightElement
                  color="gray.300"
                  fontSize="1.2em">
                  <Button
                    aria-label="Hide Password"
                    color="gray.300"
                    bg="transparent"
                    onClick={handleViewPass}
                    _focus={{
                      boxShadow: 'none',
                      background: 'transparent'
                    }}>
                    {showPassword
                      ? (
                        <ViewOffIcon name="view-off" />
                        )
                      : (
                        <ViewIcon name="view" />
                        )}
                  </Button>
                </InputRightElement>
              </InputGroup>
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
