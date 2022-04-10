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
} from "@mui/material";
import React, { useState } from "react";
import { useLang } from "@hyperobjekt/react-dashboard";
import useDataMode from "../../hooks/useDataMode";
import Slide from "../../components/Slide";
import { ModalContent } from "./DataModeModal.style";
import { Close } from "../../Icons";
import { Box } from "@mui/system";
import { visuallyHidden } from "@mui/utils";

const DataModeModal = () => {
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
    "DATAMODE_TITLE",
    "DATAMODE_DESCRIPTION",
    "DATAMODE_LABEL",
    "DATAMODE_RAW_LABEL",
    "DATAMODE_MODELED_LABEL",
    "DATAMODE_RAW_DESCRIPTION",
    "DATAMODE_MODELED_DESCRIPTION",
    "DATAMODE_APPLY_BUTTON",
    "DATAMODE_CANCEL_BUTTON",
  ]);
  return (
    <>
      <Button
        variant="bordered"
        className="map-controls__data-options"
        onClick={handleOpen}
      >
        {buttonLabel}
      </Button>
      <Modal
        aria-labelledby="data-modal-title"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={open}>
          <ModalContent className="map-controls__modal-wrapper">
            <Toolbar
              sx={{
                justifyContent: "space-between",
                borderBottom: "1px solid",
                borderBottomColor: "divider",
              }}
            >
              <Typography id="data-modal-title" variant="h2">
                {modalTitle}
              </Typography>
              <IconButton onClick={handleClose}>
                <Close aria-label="Close" />
              </IconButton>
            </Toolbar>
            <Box p={3}>
              <Typography>{modalDescription}</Typography>
              <FormControl>
                <FormLabel
                  id="data-mode-radio-buttons-group"
                  sx={visuallyHidden}
                >
                  {dataModeLabel}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="data-mode-radio-buttons-group"
                  name="data-mode-radio-buttons-group"
                  value={localDataMode}
                  onChange={handleModeSwitch}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    mt: 3,
                    gap: 3,
                  }}
                >
                  <ButtonBase
                    component="div"
                    tabIndex={-1}
                    className="data-mode__option"
                    onClick={() =>
                      handleModeSwitch({ target: { value: "raw" } })
                    }
                  >
                    <FormControlLabel
                      control={<Radio name="dataMode" value="raw" />}
                      label={rawLabel}
                    />
                    <Typography
                      variant="body2"
                      className="data-mode__description"
                    >
                      {rawDescription}
                    </Typography>
                  </ButtonBase>
                  <ButtonBase
                    component="div"
                    tabIndex={-1}
                    className="data-mode__option"
                    onClick={() =>
                      handleModeSwitch({ target: { value: "modelled" } })
                    }
                  >
                    <FormControlLabel
                      control={<Radio name="dataMode" value="modelled" />}
                      label={modeledLabel}
                    />
                    <Typography
                      variant="body2"
                      className="data-mode__description"
                    >
                      {modeledDescription}
                    </Typography>
                  </ButtonBase>
                </RadioGroup>
              </FormControl>
            </Box>
            <Toolbar sx={{ justifyContent: "flex-end", gap: 2 }}>
              <Button variant="contained" color="primary" onClick={handleApply}>
                {applyLabel}
              </Button>
              <Button
                variant="contained"
                color="grey"
                onClick={handleClose}
                disableElevation
              >
                {cancelLabel}
              </Button>
            </Toolbar>
          </ModalContent>
        </Slide>
      </Modal>
    </>
  );
};

export default DataModeModal;
