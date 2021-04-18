import React from 'react';
import { Heading, Spacer, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import store from '../utils/store';
import { useGetTransactionByUserId } from '../hooks/useTransaction';

export default function ViewTransactions() {
  const transactions = store.getState().transactions;
  const headers = Object.keys(transactions[0]).filter(header => header !== 'modification_time');

  React.useEffect(() => {
    if (store.getState().user) {
      useGetTransactionByUserId(store.getState().user.id);
    }
  }, []);

  return (
    <>
      <Heading as="h1" size="2xl" alignSelf="center" m="120px auto 20px auto">
        Last Five Transactions:
      </Heading>
      <Table w="90%" m="20px" alignSelf="center">
        <Thead >
          <Tr>
            <Th fontSize="20px" px="5px" textAlign="center">#</Th>
            {
              headers.map(header => (
                <Th key={header} fontSize="20px" px="5px" textAlign="center">{header}</Th>
              ))
            }
          </Tr>
        </Thead>
        <Tbody>
            {
              transactions.map((transaction, index) => (
                <Tr key={transaction.id}>
                  {
                    <>
                      <Td px="5px" textAlign="center">{index + 1}</Td>
                      <Td px="5px" textAlign="center">{transaction.id}</Td>
                      <Td px="5px" textAlign="center">${transaction.amount}</Td>
                      <Td px="5px" textAlign="center">{transaction.label}</Td>
                      <Td px="5px" textAlign="center">{transaction.user_id}</Td>
                      <Td px="5px" textAlign="center">{transaction.account_id}</Td>
                      <Td px="5px" textAlign="center">{transaction.creation_time}</Td>
                    </>
                  }
                </Tr>
              ))
            }
        </Tbody>
        <Tfoot>
          <Tr>
            <Th fontSize="20px" px="5px" textAlign="center">Total</Th>
            <Th fontSize="20px" px="5px" textAlign="center"></Th>
            <Th fontSize="20px" px="5px" textAlign="center">${transactions.reduce((sum, transaction) => {
              return parseInt(sum) + parseInt(transaction.amount);
            }, [0])}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  );
}
