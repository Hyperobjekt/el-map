import {
  Button,
  Typography,
  Backdrop,
  Radio,
  Toolbar,
  Paper,
  Container,
  FormControlLabel,
  FormControl,
  RadioGroup,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { useLang } from '@hyperobjekt/react-dashboard';
import Slide from '../../components/Slide';
import { ModalStyled } from '../../components/Modal.style';

const formats = [
  {
    label: 'Excel',
    value: 'xlsx',
  },
  {
    label: 'PDF',
    value: 'pdf',
  },
  {
    label: 'Powerpoint',
    value: 'pptx',
  },
];

const ReportModal = ({ open, selectFormat }) => {
  const modalHeading = useLang('REPORTS_MODAL_HEADING');
  const [format, setFormat] = useState('xlsx');

  return (
    <ModalStyled
      className="data-mode__root"
      aria-labelledby="data-modal-title"
      disablePortal={false}
      open={open}
      onClose={() => selectFormat('')}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Slide in={open}>
        <Paper className="data-mode__content data-mode__content--small">
          <Toolbar className="data-mode__header">
            <Typography id="data-modal-title" variant="h2">
              {modalHeading}
            </Typography>
            <IconButton onClick={() => selectFormat('')}>
              <CloseIcon aria-label="Close" />
            </IconButton>
          </Toolbar>
          <Container className="data-mode__body data-mode__body--small">
            <FormControl>
              <RadioGroup defaultValue={format} onChange={(e) => setFormat(e.target.value)}>
                {formats.map((data, idx) => (
                  <FormControlLabel key={idx} control={<Radio />} {...data} />
                ))}
              </RadioGroup>
            </FormControl>
          </Container>
          <Toolbar className="data-mode__actions">
            <Button variant="contained" color="primary" onClick={() => selectFormat(format)}>
              OK
            </Button>
          </Toolbar>
        </Paper>
      </Slide>
    </ModalStyled>
  );
};

export default ReportModal;
