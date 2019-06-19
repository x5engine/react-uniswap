import gql from 'graphql-tag';

export const QueryGetExchangeData = gql`
  query GetExchangeData($first: String) {
    exchanges(first: $first) {
      id
      ethBalance
    }
  }
`;

export const QueryGetUserTransaction = gql`
  query GetUserTransaction($first: String, $where: String) {
    exchanges(first: 1, where: $where) {
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
