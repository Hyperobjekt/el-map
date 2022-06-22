import {
  Button,
  Typography,
  Modal,
  Backdrop,
  IconButton,
  Toolbar,
  Select,
  ButtonBase,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Paper,
  Container,
  FormGroup,
  Checkbox,
} from '@mui/material';
import React, { useState } from 'react';
import { useLang } from '@hyperobjekt/react-dashboard';
import useDataMode from '../../hooks/useDataMode';
import Slide from '../../components/Slide';
import { DataModeModal, ModalContent } from '../../Map/components/DataMode.style';
import { Close } from '../../Icons';
import { Box } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import { getReportData } from '../utils';

// TODOxx: create reusable styled modal component

const ReportsModal = ({ open, setOpen, ...props }) => {
  const [pdf, setPdf] = useState(true);
  const togglePptx = () => setPptx(!pptx);
  const [pptx, setPptx] = useState(true);
  const togglePdf = () => setPdf(!pdf);
  const [xlsx, setXlsx] = useState(true);
  const toggleXlsx = () => setXlsx(!xlsx);
  const [executing, setExecuting] = useState(false);

  const handleClose = () => setOpen(false);
  const handleApply = () => {
    // in case we're testing local or dev endpoints
    const endpoint = document.getElementById('endpoint')?.value || 'prod';
    console.log({ pdf, pptx, xlsx, endpoint });
    const data = {};
    getReportData({ data, pdf, pptx, xlsx, endpoint });
  };
  return (
    <DataModeModal
      className="data-mode__root"
      aria-labelledby="data-modal-title"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      // {...props}
    >
      <Slide in={open} className="data-mode__wrapper">
        <Paper className="data-mode__content">
          <Toolbar className="data-mode__header">
            <Typography id="data-modal-title" variant="h2">
              {'modalTitle'}
            </Typography>
            <IconButton onClick={handleClose}>
              <Close aria-label="Close" />
            </IconButton>
          </Toolbar>
          <Container className="data-mode__body">
            <Typography>{'modalDescription'}</Typography>
            <FormControl>
              <FormLabel id="data-mode-radio-buttons-group" sx={visuallyHidden}>
                {'dataModeLabel'}
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox onChange={togglePptx} checked={pptx} />}
                  label="pptx"
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox onChange={togglePdf} checked={pdf} />}
                  label="pdf"
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox onChange={toggleXlsx} checked={xlsx} />}
                  label="xlsx"
                />
              </FormGroup>
              {/* {} */}
              {/* for testing */}
              <FormGroup>
                <select id="endpoint">
                  <option value="prod">Production</option>
                  <option value="dev">Development</option>
                  <option value="local">Local</option>
                </select>
              </FormGroup>
            </FormControl>
          </Container>
          <Toolbar className="data-mode__actions">
            <Button
              variant="contained"
              color="primary"
              onClick={handleApply}
              disabled={!(pptx || pdf || xlsx)}
            >
              {'applyLabel'}
            </Button>
            <Button variant="contained" color="grey" onClick={handleClose} disableElevation>
              {'cancelLabel'}
            </Button>
          </Toolbar>
        </Paper>
      </Slide>
    </DataModeModal>
  );
};

export default ReportsModal;
