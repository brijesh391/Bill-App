import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const BillForm = ({ open, onClose, onSubmit, bill }) => {
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    amount: '',
    date: '',
  });

  useEffect(() => {
    if (bill) {
      setFormData(bill);
    } else {
      setFormData({
        description: '',
        category: '',
        amount: '',
        date: '',
      });
    }
  }, [bill]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{bill ? 'Edit Bill' : 'Add New Bill'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="amount"
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="date"
            label="Date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          {bill ? 'Save Changes' : 'Add Bill'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BillForm;

