import React, { useState } from 'react';
import {
  Button,
  HStack,
  Image,
  InputGroup,
  Input,
  InputLeftElement,
  Text,
  useRadioGroup,
  VStack,
  Heading
} from '@chakra-ui/react';
import RadioCard from '../components/radioCard';
import { usePostNewTransaction, useGetTransactionsByUserId } from '../hooks/useTransaction';
import store from '../utils/store';

export default function Transactions(props) {
  const accounts = store.getState().accounts;
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState();
  const [account, setAccount] = useState(accounts[0]);

  const handleInputChange = e => {
    const field = e.target.dataset.field;
    const amount = field === 'deposit' ? e.target.value : -e.target.value;
    if (props.user) {
      setTransactions({
        ...transactions,
        [field]: {
          amount: amount,
          label: `new ${field}`,
          userId: props.user.id,
          accountId: account.id
        }
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (transactions.deposit) {
      setIsLoading(true);
      const res = await usePostNewTransaction(transactions.deposit);
      if (res) {
        setIsLoading(false);
        useGetTransactionsByUserId(store.getState().user.id);
      }
    }
    if (transactions.withdrawal) {
      setIsLoading(true);
      const res = await usePostNewTransaction(transactions.withdrawal);
      if (res) {
        setIsLoading(false);
      }
    }
    if (transactions.transfer) {
      setIsLoading(true);
      const res = await usePostNewTransaction(transactions.transfer);
      if (res) {
        setIsLoading(false);
      }
    }
  };

  const handleChangeAccount = value => {
    setAccount(accounts.filter(account => account.id === parseInt(value))[0]);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'Account Id',
    defaultValue: accounts[0].id,
    onChange: handleChangeAccount
  });
  const group = getRootProps();

  return (
    <>
      <VStack mt="5vh">
        <Image
          src="./images/logo.png"
          h="10vh"
          w="10vh"
          alt="logo"
          margin="auto" />
        <HStack mt="auto" mx="auto" mb="5vh" alignSelf="center" justifyContent="center" {...group}>
          <Heading as="h1" size="lg">
            Accounts:
          </Heading>
          {accounts &&
          accounts.map(radioAccount => {
            const radio = getRadioProps({ value: radioAccount.id, name: 'Account Id' });
            return (
              <RadioCard key={radioAccount.id} {...radio}>
                {radioAccount.id}
              </RadioCard>
            );
          })}
        </HStack>
        <VStack w="60%" mt="3vh">
          <Text fontSize="35px" color="brand.100" mb="1vh">
            Balance: ${account.balance}
          </Text>
          <form onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '40%' }}>
            <InputGroup mb="1vh">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em">
                $
                </InputLeftElement>
              <Input type="number" placeholder="Enter deposit amount" onChange={handleInputChange} data-field="deposit" />
            </InputGroup>
            <InputGroup mb="1vh">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em">
                $
                </InputLeftElement>
              <Input type="number" placeholder="Enter withdrawal amount" onChange={handleInputChange} data-field="withdrawal" />
            </InputGroup>
            <InputGroup mb="1vh">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em">
                $
                </InputLeftElement>
              <Input type="number" placeholder="Enter transfer amount" onChange={handleInputChange} data-field="transfer" />
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
