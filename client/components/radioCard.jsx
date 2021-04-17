import React from 'react';
import { Box, useRadio } from '@chakra-ui/react';

export default function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'brand.100',
          color: 'white',
          borderColor: 'brand.100'
        }}
        _focus={{
          boxShadow: 'none'
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}
