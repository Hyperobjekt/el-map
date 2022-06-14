import {
  Button,
  Typography,
  Modal,
  Backdrop,
  IconButton,
  Toolbar,
  ButtonBase,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Paper,
  Container,
} from '@mui/material';
import React, { useState } from 'react';
import { useLang } from '@hyperobjekt/react-dashboard';
import useDataMode from '../../hooks/useDataMode';
import Slide from '../../components/Slide';
import { DataModeModal, ModalContent } from './DataMode.style';
import { Close, Warning } from '../../Icons';
import { Box } from '@mui/system';
import { visuallyHidden } from '@mui/utils';

const ICON_PROPS = {
  style: { width: '1em', height: '1em', color: '#999', marginBottom: -2 },
};

const DataMode = ({ ButtonProps, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const [dataMode, setDataMode] = useDataMode();
  const [localDataMode, setLocalDataMode] = useState(dataMode);
  const handleModeSwitch = (e) => {
    setLocalDataMode(e.target.value);
  };
  const handleOpen = () => {
    setLocalDataMode(dataMode);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleApply = () => {
    setDataMode(localDataMode);
    setOpen(false);
  };
  const buttonLabel = useLang(`BUTTON_${dataMode}`);
  const [
    modalTitle,
    modalDescription,
    dataModeLabel,
    rawLabel,
    modeledLabel,
    rawDescription,
    modeledDescription,
    applyLabel,
    cancelLabel,
  ] = useLang([
    'DATAMODE_TITLE',
    'DATAMODE_DESCRIPTION',
    'DATAMODE_LABEL',
    'DATAMODE_RAW_LABEL',
    'DATAMODE_MODELED_LABEL',
    'DATAMODE_RAW_DESCRIPTION',
    'DATAMODE_MODELED_DESCRIPTION',
    'DATAMODE_APPLY_BUTTON',
    'DATAMODE_CANCEL_BUTTON',
  ]);

  const rawDescriptionParts = rawDescription.split('{{icon}}');
  let rawDescriptionContent = rawDescription;

  if (rawDescriptionParts.length > 1) {
    rawDescriptionContent = (
      <>
        {rawDescriptionParts[0]}
        <Warning {...ICON_PROPS} />
        {rawDescriptionParts[1]}
      </>
    );
  }
  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        className="data-mode__button"
        onClick={handleOpen}
        {...ButtonProps}
      >
        {buttonLabel}
      </Button>
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
        {...props}
      >
        <Slide in={open} className="data-mode__wrapper">
          <Paper className="data-mode__content">
            <Toolbar className="data-mode__header">
              <Typography id="data-modal-title" variant="h2">
                {modalTitle}
              </Typography>
              <IconButton onClick={handleClose}>
                <Close aria-label="Close" />
              </IconButton>
            </Toolbar>
            <Container className="data-mode__body">
              <Typography>{modalDescription}</Typography>
              <FormControl>
                <FormLabel id="data-mode-radio-buttons-group" sx={visuallyHidden}>
                  {dataModeLabel}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="data-mode-radio-buttons-group"
                  name="data-mode-radio-buttons-group"
                  className="data-mode__radio-group"
                  value={localDataMode}
                  onChange={handleModeSwitch}
                >
                  <ButtonBase
                    component="div"
                    tabIndex={-1}
                    className="data-mode__option"
                    onClick={() => handleModeSwitch({ target: { value: 'modeled' } })}
                  >
                    <FormControlLabel
                      control={<Radio name="dataMode" value="modeled" />}
                      label={modeledLabel}
                    />
                    <Typography variant="body2" className="data-mode__description">
                      {modeledDescription}
                    </Typography>
                  </ButtonBase>
                  <ButtonBase
                    component="div"
                    tabIndex={-1}
                    className="data-mode__option"
                    onClick={() => handleModeSwitch({ target: { value: 'raw' } })}
                  >
                    <FormControlLabel
                      control={<Radio name="dataMode" value="raw" />}
                      label={rawLabel}
                    />
                    <Typography variant="body2" className="data-mode__description">
                      {rawDescriptionContent}
                    </Typography>
                  </ButtonBase>
                </RadioGroup>
              </FormControl>
            </Container>
            <Toolbar className="data-mode__actions">
              <Button variant="contained" color="primary" onClick={handleApply}>
                {applyLabel}
              </Button>
              <Button variant="contained" color="grey" onClick={handleClose} disableElevation>
                {cancelLabel}
              </Button>
            </Toolbar>
          </Paper>
        </Slide>
      </DataModeModal>
    </>
  );
};

export default DataMode;
