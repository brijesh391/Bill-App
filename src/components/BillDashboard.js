import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, Stack, TextField } from '@mui/material';
import BillList from './BillList';
import BillForm from './BillForm';
import BillChart from './BillChart';
import CategoryFilter from './CategoryFilter';
import { addBill, editBill, removeBill, setFilter, setBudget } from '../store/actions/billActions';

const BillDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBill, setEditingBill] = useState(null);
  const bills = useSelector(state => state.bills.bills);
  const filter = useSelector(state => state.bills.filter);
  const budget = useSelector(state => state.bills.budget);
  const dispatch = useDispatch();

  const handleAddBill = (bill) => {
    dispatch(addBill({ ...bill, id: Date.now() }));
    setIsFormOpen(false);
  };

  const handleEditBill = (bill) => {
    dispatch(editBill(bill));
    setEditingBill(null);
    setIsFormOpen(false);
  };

  const handleRemoveBill = (id) => {
    dispatch(removeBill(id));
  };

  const handleFilterChange = (category) => {
    dispatch(setFilter(category));
  };

  const handleBudgetChange = (newBudget) => {
    dispatch(setBudget(newBudget));
  };
  const [localBudget, setLocalBudget] = useState('');

  const handleBudgetInput = (event) => {
    setLocalBudget(event.target.value);
  };

  const saveBudget = () => {
    const newBudget = parseFloat(localBudget) || 0;
    dispatch(setBudget(newBudget));
  };

  const filteredBills = filter === 'all' 
    ? bills 
    : bills.filter(bill => bill.category.toLowerCase() === filter.toLowerCase());

  const totalAmount = filteredBills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0);

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bill Manager
      </Typography>
      <Typography variant="h6" gutterBottom>
        Total Monthly Billed Amount: ${totalAmount.toFixed(2)}
      </Typography>
      <Stack justifyContent="space-between" direction="row" alignItems="center" m={2}>
      <Button variant="contained" onClick={() => setIsFormOpen(true)} sx={{ mb: 2 }}>
        Add New Bill
      </Button>
      <Stack direction="row" p={3}>
      <TextField
          label="Set Monthly Budget"
          variant="outlined"
          type="number"
          value={localBudget}
          onChange={handleBudgetInput}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={saveBudget}>
          Save Budget
        </Button>


      </Stack>
     
      </Stack>
     
      
     
      <CategoryFilter onFilterChange={handleFilterChange} />
      <BillList 
        bills={filteredBills} 
        onEdit={setEditingBill} 
        onRemove={handleRemoveBill}
        budget={budget}
      />
      <Stack height={40} width={"100%"} ></Stack>
      <BillChart bills={bills}  />
      <BillForm
        open={isFormOpen || !!editingBill}
        onClose={() => {
          setIsFormOpen(false);
          setEditingBill(null);
        }}
        onSubmit={editingBill ? handleEditBill : handleAddBill}
        bill={editingBill}
      />
    </Box>
  );
};

export default BillDashboard;

