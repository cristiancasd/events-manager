import { Button, Grid } from '@mui/material';
import { LevelComponent } from './LevelComponent';
import { LevelNewComponent } from './LevelNewComponent';

export const LevelListComponent = ({
  levels = [],
  isFetching = false,
  handleEdit,
  handleCreate,
  handleDelete,
  handleShowTableByLevel,
}) => {
  return (
    <Grid>
      <Grid paddingTop={1}>
        {levels &&
          levels.map((level) => (
            <LevelComponent
              handleShowTableByLevel={handleShowTableByLevel}
              handleDelete={handleDelete}
              level={level}
              handleEdit={handleEdit}
              key={level.id}
            />
          ))}
      </Grid>

      <LevelNewComponent handleCreate={handleCreate} />
    </Grid>
  );
};
