import React from 'react';
import { Query } from 'react-apollo';
import AppBar from '../../components/AppBar';
import Button from '../../components/Button';
import DataTable from '../../components/DataTable';
import { QueryGetExchangeData } from '../../graphql/uniswap';
import './style.css';

function Dashboard() {
  const query = '';
  return (
    <React.Fragment>
      <AppBar />
      <div className="btn-transfer">
        <Button btnText="Transfer ETH" />
      </div>
      <div className="container">
        <Query query={QueryGetExchangeData} variables={{ query }}>
          {({ data, loading, error, fetchMore }) => {
            if (error) return <p>{error.message}</p>;
            return (
              <DataTable
                loading={loading}
                userData={data || []}
                onLoadMore={() =>
                  fetchMore({
                    query: QueryGetExchangeData,
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                      const newUserData = fetchMoreResult.data;
                      return newUserData.length
                        ? {
                            userData: [...newUserData, ...prevResult],
                          }
                        : prevResult;
                    },
                  })
                }
              />
            );
          }}
        </Query>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
