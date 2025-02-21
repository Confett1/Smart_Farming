import React from 'react'
import { Box, SxProps } from '@mui/material';
import { ImgHTMLAttributes } from 'react';

const Image = ({ sx, ...rest }) => {
  return <Box component="img" sx={sx} {...rest} />;
};

export default Image;
