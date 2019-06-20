import React from 'react';
import { Query } from 'react-apollo';
import AppBar from '../../components/AppBar';
import Button from '../../components/Button';
import DataTable from '../../components/DataTable';
import { QueryGetExchangeData } from '../../graphql/uniswap';
import './style.css';

function Dashboard() {
  let skip = 0;
  const first = 20;
  return (
    <React.Fragment>
      <AppBar />
      <div className="btn-transfer">
        <Button btnText="Transfer ETH" />
      </div>
      <div className="container">
        <Query
          notifyOnNetworkStatusChange
          query={QueryGetExchangeData}
          variables={{ first, skip }}
        >
          {({ loading, error, data, fetchMore }) => {
            if (error) return <p>{error.message}</p>;
            return (
              <DataTable
                loading={loading}
                data={data || []}
                onLoadMore={() => {
                  fetchMore({
                    query: QueryGetExchangeData,
                    variables: { first, skip },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                      const newResult = fetchMoreResult;
                      const newUserData = prevResult;
                      skip += 20;
                      for (let i = 0; i < newResult.exchanges.length; i += 1)
                        newUserData.exchanges.push(
                          fetchMoreResult.exchanges[i],
                        );
                      return newResult.length
                        ? {
                            data: newUserData.exchanges,
                          }
                        : prevResult;
                    },
                  });
                }}
              />
            );
          }}
        </Query>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
