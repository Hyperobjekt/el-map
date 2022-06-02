import React from "react";
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import {
  useSetLanguage,
  useLang,
  useLangStore,
} from "@hyperobjekt/react-dashboard";
const LanguageSelect = (props) => {
  const currentLanguage = useLangStore((state) => state.language);
  const setLanguage = useSetLanguage();
  const handleChange = (e) => {
    setLanguage(e.target.value);
  };
  const [englishLabel, spanishLabel, languageLabel] = useLang([
    "LANGUAGE_EN",
    "LANGUAGE_ES",
    "SELECT_LANGUAGE_LABEL",
  ]);
  // flexBasis so it doesn't overlap Menu
  return (
    <FormControl {...props} sx={{ flexBasis: "100px" }}>
      <InputLabel sx={visuallyHidden} id="lang-select-label">
        {languageLabel}
      </InputLabel>
      <Select
        variant="outlined"
        labelId="lang-select-label"
        id="lang-select"
        value={currentLanguage}
        sx={{ minWidth: 14 * 8 }}
        onChange={handleChange}
      >
        <MenuItem value="en">{englishLabel}</MenuItem>
        <MenuItem value="es">{spanishLabel}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
