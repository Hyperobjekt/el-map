import {
  Button,
  Typography,
  Backdrop,
  Toolbar,
  Paper,
  Container,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import React from 'react';
import { useLang } from '@hyperobjekt/react-dashboard';
import Slide from './Slide';
import { Box } from '@mui/system';
import LinkedTypography from './LinkedTypography';
import LanguageSelect from '../Controls/components/LanguageSelect';
import { ModalStyled } from './Modal.style';

const InfoModal = ({ ButtonProps, ...props }) => {
  const permanentlyDismissed = localStorage.getItem('permanently-dismissed');
  const [open, setOpen] = React.useState(!permanentlyDismissed);
  const [PDChecked, setPDChecked] = React.useState(false);
  const togglePDChecked = (e) => setPDChecked(e.target.checked);
  const handleClose = () => {
    if (PDChecked) {
      localStorage.setItem('permanently-dismissed', true);
    }
    setOpen(false);
  };

  const [modalTitle, instructions, closing, permanentlyDismissIntro] = useLang([
    'INTRO_TITLE',
    'INTRO_INSTRUCTIONS',
    'INTRO_CLOSING',
    'PERMANENTLY_DISMISS_INTRO',
  ]);
  const qas = useLang([
    'INTRO_P1_TITLE',
    'INTRO_P1_DESCRIPTION',
    'INTRO_P2_TITLE',
    'INTRO_P2_DESCRIPTION',
    'INTRO_P3_TITLE',
    'INTRO_P3_DESCRIPTION',
    'INTRO_P4_TITLE',
    'INTRO_P4_DESCRIPTION',
    'INTRO_P5_TITLE',
    'INTRO_P5_DESCRIPTION',
  ]);
  return (
    <ModalStyled
      className="data-mode__root"
      aria-labelledby="data-modal-title"
      disablePortal={true}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      {...props}
    >
      <Slide in={open} className="data-mode__wrapper">
        <Paper className="data-mode__content">
          <Toolbar className="data-mode__header">
            <Typography id="data-modal-title" variant="h2">
              {modalTitle}
            </Typography>
            <LanguageSelect />
            {/* <IconButton onClick={handleClose}>
              <Close aria-label="Close" />
            </IconButton> */}
          </Toolbar>
          <Container className="data-mode__body">
            <Typography variant="body1">{instructions}</Typography>
            {qas.map((title, i) => {
              if (i % 2) return null;
              const desc = qas[i + 1];
              return (
                <Box key={i} py={1}>
                  <LinkedTypography text={title} variant="h4" pb={0.5} />
                  <LinkedTypography text={desc} variant="body1" />
                </Box>
              );
            })}
            <LinkedTypography text={closing} variant="body1" />
          </Container>
          <Toolbar className="data-mode__actions">
            <FormControlLabel
              control={<Checkbox checked={PDChecked} onChange={togglePDChecked} />}
              label={permanentlyDismissIntro}
            />
            <Button variant="contained" color="primary" onClick={handleClose}>
              {'OK'}
            </Button>
          </Toolbar>
        </Paper>
      </Slide>
    </ModalStyled>
  );
};

export default InfoModal;
