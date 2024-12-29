import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BillList = ({ bills, onEdit, onRemove, budget }) => {
  const sortedBills = [...bills].sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
  
  let runningTotal = 0;
  const billsToHighlight = new Set();

  for (const bill of sortedBills) {
    if (runningTotal + parseFloat(bill.amount) <= budget) {
      runningTotal += parseFloat(bill.amount);
      billsToHighlight.add(bill.id);
    } else {
      break;
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBills.map((bill) => (
            <TableRow key={bill.id} style={{ backgroundColor: billsToHighlight.has(bill.id) ? '#e6ffe6' : 'inherit' }}>
              <TableCell>{bill.description}</TableCell>
              <TableCell>{bill.category}</TableCell>
              <TableCell>${parseFloat(bill.amount).toFixed(2)}</TableCell>
              <TableCell>{bill.date}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(bill)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onRemove(bill.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BillList;

