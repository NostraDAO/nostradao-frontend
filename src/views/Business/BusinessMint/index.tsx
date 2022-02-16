/* eslint-disable prettier/prettier */
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import "./business-mint.scss";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: 'black"'
  },
  input: {
    color: "white",
  }
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 300,
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
  const classes = useStyles();

  return (
    <>
     <Modal
        open={isOpen}
        onClose={handleClose}
        className="modal-style"
      >
        <Box sx={style }>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
          <h2 id="child-modal-title">{title}</h2>
          <p id="child-modal-description">
            {children}
          </p>
          <Stack spacing={4} direction="column" style={{paddingTop: '15px'}}>
          <TextField autoFocus  id="mint-number" label="How much NFTs" variant="filled"   InputProps={{ className: classes.input }}   className={classes.root} />
          <Button variant="outlined" onClick={handleMint}>Mint</Button>
          </Stack>
      

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