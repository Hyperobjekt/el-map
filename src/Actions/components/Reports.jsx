import { Typography, Button, Box } from '@mui/material';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import {
  useLang,
  useCurrentContext,
  useLangStore,
  useLocationFeature,
  useYearOptions,
} from '@hyperobjekt/react-dashboard';
import { getAssetPath } from '../../utils';
import ReportModal from './ReportModal';

const Reports = ({ className, ...props }) => {
  const [heading, description, buttonLabel] = useLang([
    'REPORTS_HEADING',
    'REPORTS_DESCRIPTION',
    'REPORTS_BUTTON_LABEL',
  ]);
  const lang = useLangStore((state) => state.language);
  const [modalOpen, setModalOpen] = useState(false);
  const currentContext = useCurrentContext();
  const { year } = currentContext;
  const locationFeatures = useLocationFeature();
  const options = useYearOptions();

  const handleSelectReports = () => {
    setModalOpen(true);
  };

  const downloadReports = useCallback(
    async (format = null) => {
      setModalOpen(false);

      if (!format) return;

      const reportEndpoint = `${import.meta.env.VITE_REPORTS_API_BASE}/${format}`;
      const payload = {
        id: 'eviction-lab',
        data: {
          lang,
          year,
          years: [parseInt(options[0].id), parseInt(options[options.length - 1].id)],
          features: locationFeatures,
        },
      };
      try {
        const resp = await fetch(reportEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (!resp.ok) throw new Error();
        const reportsBlob = await resp.blob();

        // Download report
        const objectURL = URL.createObjectURL(reportsBlob);
        const tempLink = document.createElement('a');
        tempLink.href = objectURL;
        tempLink.download = `reports.${format}`;
        tempLink.click();
      } catch (e) {
        // Todo: Error handling. Will address this later
      }
    },
    [lang, year, locationFeatures, options],
  );

  return (
    <Box className={clsx(className)} {...props}>
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
      <ReportModal open={modalOpen} selectFormat={downloadReports} />
    </Box>
  );
};

export default Reports;
