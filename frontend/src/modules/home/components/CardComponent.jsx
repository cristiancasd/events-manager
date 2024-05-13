import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

export const CardComponent = ({ imagePath, title, description }) => {
  return (

    <Grid container justifyContent="center" alignItems="center">

      <Grid item alignSelf="center">

        <Card sx={{ maxWidth: {xs:300, sm:345} }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height={110}
              image={imagePath}
              alt="iamge"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>


  )
}