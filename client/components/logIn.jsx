import React, { useState } from 'react';
import {
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack
} from '@chakra-ui/react';
import { LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { usePostUserAuthById } from '../hooks/useUser';
import { useHistory } from 'react-router-dom';

export default function LogIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidPass, setIsValidPass] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const history = useHistory();

  const handleInputChange = e => {
    setUser({
      ...user,
      [e.target.dataset.field]: e.target.value
    });
  };

  const handleViewPass = e => {
    setShowPassword(!showPassword);
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

  const handleSubmit = async e => {
    e.preventDefault();
    if (user && user.userId && user.password) {
      setIsLoading(true);
      const res = await usePostUserAuthById(user.userId, user.password);
      if (res) {
        history.push('/home-page');
      }
    }
  };

  return (
    <>
      <VStack marginTop="5vh">
        <Image
          src="./images/logo.png"
          h="10vh"
          w="10vh"
          alt="logo"
          margin="auto" />
        <VStack>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <InputGroup mb="1vh">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em">
                <FontAwesomeIcon icon={faUser} />
              </InputLeftElement>
              <Input type="text" placeholder="User Id" onChange={handleInputChange} data-field="userId"/>
            </InputGroup>
            <InputGroup mb="1vh">
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
                isInvalid={!isValidPass}/>
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
