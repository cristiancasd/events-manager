import { Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from '../../../shared/hooks/useForm';

const loginFormFields = {
  email: '',
  password: '',
  nickCommerce: '',
};
export const LoginForm = ({ onSubmit, title }) => {
  const { email, password, nickCommerce, onInputChange, formState } = useForm(loginFormFields);

  return (
    <Grid
      item
      className="box-shadow"
      xs={10}
      sx={{
        width: { sm: 450 },
        backgroundColor: 'white',
        padding: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        fontSize={18}
        color="primary"
        backgroundColor="gree"
        fontWeight="bold"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {title}
      </Typography>
      <form onSubmit={(event) => onSubmit({ event, formState })}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nick Commerce"
              placeholder="Nick commerce"
              fullWidth
              name="nickCommerce"
              value={nickCommerce}
              onChange={onInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="Consultant email"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onInputChange}
              fullWidth
              required
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
