import React from 'react';
import { Box, Typography } from '@mui/material';

const style = {
  DashboardContainer: {
    display: 'flex',
    flex: 0.8,
  },
}

export default function Dashboard() {
  return (
    <Box sx={style.DashboardContainer}>
      <Typography>Dashboard</Typography>
    </Box>
  )
}
