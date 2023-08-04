import { Box, LinearProgress } from '@mui/material';
import { NextPage } from 'next';
import { PropsWithChildren } from 'react';

export interface LoaderProps {
  color: "primary" | "secondary" | "inherit" | "error" | "info" | "success" | "warning" 
  value?: number
  varient: "buffer" | "determinate" | "indeterminate" | "query" 
}

const Loader:NextPage<LoaderProps> = (props:PropsWithChildren<LoaderProps>) => { 
  const {color='primary', varient='indeterminate', value} = props;

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress color={color} value={value} variant={varient}/>
    </Box>
  );
}

export default Loader;