import React from 'react';
import store from '../utils/store';
import NavBar from '../components/navBar';
import { Flex, HStack, useRadioGroup } from '@chakra-ui/react';
import RadioCard from '../components/radioCard';
import User from '../components/user';
import ViewTransactions from '../components/viewTransactions';
import { useGetTransactionsByUserId } from '../hooks/useTransaction';
import { useGetAccountsByUserId } from '../hooks/useAccount';
import EditUser from '../components/editUser';
import Transactions from '../components/transactions';

export default function HomePage() {
  const user = store.getState().user;
  const [view, setView] = React.useState(<User user={user} />);

  React.useEffect(() => {
    if (user) {
      useGetTransactionsByUserId(user.id);
      useGetAccountsByUserId(user.id);
    }
  }, [user]);

  const handleChangeView = value => {
    if (value === 'User Profile') setView(<User user={user} />);
    if (value === 'View Transactions') setView(<ViewTransactions />);
    if (value === 'Manage Account') setView(<EditUser user={user}/>);
    if (value === 'Transactions') setView(<Transactions user={user} />);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'Account',
    defaultValue: 'User Profile',
    onChange: handleChangeView
  });
  const group = getRootProps();

  const options = ['User Profile', 'View Transactions', 'Manage Account', 'Transactions'];

  return (
    <>
      <Flex bg="white" h="100vh" flexDir="column">
        <NavBar alignSelf="flex-start" heading="Home Page" />
        <Flex
          h="60vh"
          w="40vw"
          m="auto"
          flexDir="column"
          alignContent="center"
          justifyContent="center"
          border="2px black solid"
          borderRadius="20px"
          boxShadow="30 10px 20px rgba(200, 200, 200, 0.1)">
          {view}
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
