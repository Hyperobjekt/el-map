import { Typography, Button, Box } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { useLang } from '@hyperobjekt/react-dashboard';
import { getAssetPath } from '../../utils';
import ReportsModal from './ReportsModal';

const Reports = ({ className, ...props }) => {
  const [modalOpen, setModalOpen] = React.useState(true);

  const [heading, description, buttonLabel] = useLang([
    'REPORTS_HEADING',
    'REPORTS_DESCRIPTION',
    'REPORTS_BUTTON_LABEL_TEMP',
    // "REPORTS_BUTTON_LABEL",
  ]);
  const handleSelectReports = () => setModalOpen(true);
  return (
    <Box className={clsx(className)} {...props}>
      <ReportsModal open={modalOpen} setOpen={setModalOpen} />
      <Typography variant="h2">{heading}</Typography>
      <Box className="actions__image" height={72}>
        <img src={getAssetPath('assets/img/download.svg')} alt="" />
      </Box>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
      <Button variant="bordered" onClick={handleSelectReports}>
        {buttonLabel}
      </Button>
    </Box>
  );
};

export default Reports;
