import React, { useState } from 'react';
import { Flex, HStack, useRadioGroup } from '@chakra-ui/react';
import LogIn from '../components/logIn';
import SignUp from '../components/signUp';
import RadioCard from '../components/radioCard';
import NavBar from '../components/navBar';

export default function LandingPage() {

  const [isLogIn, setIsLogIn] = useState(true);

  const handleChange = value => {
    if (value === 'LogIn') setIsLogIn(true);
    if (value === 'SignUp') setIsLogIn(false);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'auth',
    defaultValue: 'LogIn',
    onChange: handleChange
  });
  const group = getRootProps();

  const options = ['LogIn', 'SignUp'];

  return (
    <>
      <Flex bg="white" h="100vh" flexDir="column">
        <NavBar alignSelf="flex-start" heading="SignIn/LogIn"/>
        <Flex
          h="60vh"
          w="40vw"
          m="auto"
          flexDir="column"
          border="2px black solid"
          borderRadius="20px"
          boxShadow="30 10px 20px rgba(200, 200, 200, 0.1)">
          { isLogIn
            ? <LogIn />
            : <SignUp />
          }
          <HStack mt="auto" mx="auto" mb="5vh" alignSelf="flex-end" justifyContent="center" {...group}>
            {options.map(value => {
              const radio = getRadioProps({ value });
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </HStack>
        </Flex>
      </Flex>
    </>
  );
}
