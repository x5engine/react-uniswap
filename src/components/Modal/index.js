import React from 'react';
import { Query } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { QueryGetUserTransaction } from '../../graphql/uniswap';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 750,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
}));

function SimpleModal(props) {
  const [open, setOpen] = React.useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  const userID = props;

  return (
    <div>
      <Button onClick={handleOpen}>Details</Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            Transactions
          </Typography>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Token&nbsp;Address</TableCell>
                  <TableCell>Token&nbsp;Symbol</TableCell>
                  <TableCell>Ehterum&nbsp;Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <Query
                  query={QueryGetUserTransaction}
                  variables={{ where: userID.userID }}
                >
                  {({ data, loading, error, fetchMore }) => {
                    if (error) return <p>{error.message}</p>;
                    console.log('Modal: ', data);
                    if (!loading) {
                      return data.exchanges[0].txs.map(row => (
                        <TableRow>
                          <TableCell>{row.tokenAddress}</TableCell>
                          <TableCell>{row.tokenSymbol}</TableCell>
                          <TableCell>{row.ethAmount}</TableCell>
                        </TableRow>
                      ));
                    }
                    return <p>Loading...</p>;
                  }}
                </Query>
              </TableBody>
            </Table>
          </Paper>
        </div>
      </Modal>
    </div>
  );
}

export default SimpleModal;
