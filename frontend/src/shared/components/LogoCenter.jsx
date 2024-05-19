import { Box } from '@mui/material';
import static_URLs from '../../config/staticUrls';

export const LogoCenter = ({ place = 'center' }) => {
  const logoUrl = static_URLs.logo;

  return (
    <Box sx={{ display: 'flex', alignItems: place, justifyContent: place }}>
      <img src={logoUrl} alt="Logo" width="250" />
    </Box>
  );
};
