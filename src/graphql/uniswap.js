import gql from 'graphql-tag';

export const QueryGetExchangeData = gql`
  query GetExchangeData($first: Int!, $skip: Int!) {
    exchanges(first: $first, skip: $skip) {
      id
      ethBalance
    }
  }
`;

export const QueryGetUserTransaction = gql`
  query GetUserTransaction($first: String, $id: String) {
    exchanges(id: $id) {
      id
      txs(first: 5) {
        id
        tokenSymbol
        tokenAddress
        ethAmount
      }
    }
  }
`;
