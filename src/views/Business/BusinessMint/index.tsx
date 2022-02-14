/* eslint-disable prettier/prettier */
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  color: 'white',
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const BusinessMint = ( {
  isOpen,
  handleClose,
  handleMint,
  title,
  children
}) => {
  return (
    <>
     <Modal
        hideBackdrop
        open={isOpen}
        onClose={handleClose}
      >
        <Box sx={style }>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            {children}
          </p>
          <Button onClick={handleMint}>Mint</Button>
          <Button onClick={handleClose}>Closel</Button>
        </Box>
      </Modal>

    </>
  )
  }

  BusinessMint.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    hadnleMint: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.element.isRequired
  };