import { AppBar, Box, Button, Grid, Toolbar, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Nombre',
    width: 200,
  },
  {
    field: 'date',
    headerName: 'Fecha',
    width: 150,
  },
  {
    field: 'description',
    headerName: 'Descripcion',
    width: 150,
  },
];

export const EventsTableComponent = ({ events }) => {
  return (
    <Box
      sx={{
        //height: 400,
        width: '100%',
      }}
    >
      {events && events.length > 0 && (
        <DataGrid
          rows={events}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          //checkboxSelection
          //disableRowSelectionOnClick
        />
      )}
    </Box>
  );
};
