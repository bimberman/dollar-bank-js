import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

export default function NavBar(props) {
  const { heading } = props;
  return (
    <>
      <Flex bg="brand.100" h="10%" w="100%" alignSelf="flex-start" justifyContent="center">
        <Heading as="h1" size="4xl" color="white">{heading}</Heading>
      </Flex>
    </>
  );
}
