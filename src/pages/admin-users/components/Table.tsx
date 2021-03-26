import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface IBasicTableProps {
  data: Array<Record<string, any>>;
  idField?: string;
}

const BasicTable: React.FC<IBasicTableProps> = ({ data, idField }) => {
  const classes = useStyles();

  const id = idField || '_id';

  console.log('data', data);
  if (!data) return <></>;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {data[0] &&
              Object.keys(data[0]).map((colName) => (
                <TableCell align='right' key={colName}>
                  {colName}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row[id]}>
              {Object.keys(row).map((col) => (
                <TableCell align='right' key={col}>
                  {row[col]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
