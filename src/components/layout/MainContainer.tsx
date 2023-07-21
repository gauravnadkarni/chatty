import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function MainContainer(props:any) {
  return (
    <React.Fragment>
      <Container maxWidth="xl">
        {props.children}
      </Container>
    </React.Fragment>
  );
}