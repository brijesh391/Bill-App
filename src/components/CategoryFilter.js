import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';

const CategoryFilter = ({ onFilterChange }) => {
  const bills = useSelector(state => state.bills.bills);
  const filter = useSelector(state => state.bills.filter);

  const categories = ['all', ...new Set(bills.map(bill => bill.category.toLowerCase()))];

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Filter by Category</InputLabel>
      <Select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        label="Filter by Category"
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;

