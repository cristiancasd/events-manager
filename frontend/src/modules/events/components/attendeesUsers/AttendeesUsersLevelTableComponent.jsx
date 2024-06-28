import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useMemo } from 'react';

const VISIBLE_FIELDS = ['commerceUserId', 'name',  'phone',];

const columnsRef = [
  { field: 'commerceUserId', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Nombre',
    width: 200,
  },
  {
    field: 'phone',
    headerName: 'Teléfono',
    width: 150,
  },
];

export const AttendeesUsersLevelTableComponent = ({ attendeesUser }) => {
  const data = {
    columns: columnsRef,
    rows: attendeesUser,
  };

  const columns = useMemo(() => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)), [data.columns]);

  return (
    <Box sx={{ height: 400, width: 1 }}>
      <DataGrid
        {...data}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
  );
};
