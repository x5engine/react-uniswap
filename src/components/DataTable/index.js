import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SimpleModal from '../Modal';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class CustomizedTables extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  handleOnScroll = () => {
    const { onLoadMore } = this.props;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      onLoadMore();
    }
  };

  render() {
    const { classes, data, loading } = this.props;

    if (!data && loading) return <p>Loading...</p>;
    const exchanges = data.exchanges || [];
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>User Id</StyledTableCell>
              <StyledTableCell align="right">ETH&nbsp;Balance</StyledTableCell>
              <StyledTableCell align="right">Token Txs</StyledTableCell>
              <StyledTableCell align="center">Details</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exchanges.map((row, index) => (
              <StyledTableRow key={`${row.id}-${index}`}>
                <StyledTableCell>{row.id}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.ethBalance}
                </StyledTableCell>
                <StyledTableCell align="right">{row.id}</StyledTableCell>
                <StyledTableCell align="center">
                  <SimpleModal userID={row.id} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {loading && (
              <StyledTableRow>
                <StyledTableCell colSpan={4} align="center">
                  Loading...
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(CustomizedTables);
