
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BillList = ({ bills, onEdit, onRemove, budget }) => {
  // Function to calculate optimal bills within the budget
  // const findOptimalBills = (bills, budget) => {
  //   const sortedBills = [...bills].sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
  //   const optimalBills = new Set();
  //   let currentSum = 0;

  //   for (const bill of sortedBills) {
  //     if (currentSum + parseFloat(bill.amount) <= budget) {
  //       currentSum += parseFloat(bill.amount);
  //       optimalBills.add(bill.id);
  //     } else {
  //       break;
  //     }
  //   }

  //   return optimalBills;
  // };

  const findOptimalBills = (bills, budget) => {
    const n = bills.length;
    const dp = Array(n + 1).fill(null).map(() => Array(budget + 1).fill(0));
    const billIncluded = Array(n + 1).fill(null).map(() => Array(budget + 1).fill(false));
  
    // Fill the dp table
    for (let i = 1; i <= n; i++) {
      const billAmount = parseFloat(bills[i - 1].amount);
      for (let b = 1; b <= budget; b++) {
        if (billAmount <= b) {
          if (dp[i - 1][b - billAmount] + billAmount > dp[i - 1][b]) {
            dp[i][b] = dp[i - 1][b - billAmount] + billAmount;
            billIncluded[i][b] = true;
          } else {
            dp[i][b] = dp[i - 1][b];
          }
        } else {
          dp[i][b] = dp[i - 1][b];
        }
      }
    }
  
    // Backtrack to find which bills were included
    const optimalBills = new Set();
    let remainingBudget = budget;
    for (let i = n; i > 0; i--) {
      if (billIncluded[i][remainingBudget]) {
        optimalBills.add(bills[i - 1].id);
        remainingBudget -= parseFloat(bills[i - 1].amount);
      }
    }
  
    return optimalBills;
  };

  // Get the bills to highlight based on the budget
  const billsToHighlight = findOptimalBills(bills, budget);

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
          {bills.map((bill) => (
            <TableRow
              key={bill.id}
              style={{
                backgroundColor: billsToHighlight.has(bill.id) ? '#e6ffe6' : 'inherit',
              }}
            >
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

