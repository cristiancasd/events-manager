import { Box } from '@mui/material';
import static_URLs from '../../../config/staticUrls';

export const ImageAuth = () => {
  const paymentLoginImage = static_URLs.image_login;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Establecer la altura del contenedor al 100% del tamaño del formulario
      }}
    >
      <img src={paymentLoginImage} alt="Logo" height="200" />
    </Box>
  );
};
