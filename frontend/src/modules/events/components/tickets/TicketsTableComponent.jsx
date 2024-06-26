import { Grid, Typography, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { startGetLevelsList, startGetTicketsList } from '../../../../store';
import { useEffect, useState } from 'react';
import { LoadingBox, variableStatus } from '../../../../shared';
import { TicketCardComponent } from './TicketCardComponent';

const relationLevelTicket = (levelUid, tickets) => {
  const ticket = tickets.find((ticket) => ticket.levelUid === levelUid);

  if (ticket) {
    return {
      ticketName: ticket.name,
      ticketPresale: ticket.presaleFee,
      ticketSale: ticket.saleFee,
      ticketUid: ticket.id,
    };
  }

  return {
    ticketName: '',
    ticketPresale: '',
    ticketSale: '',
    ticketUid: '',
  };
};

const arrayLevelsTickets = (levels, tickets) => {
  const levelTicketEntity = {
    id: 1,
    levelName: '',
    ticketName: '',
    ticketPresale: '',
    ticketSale: '',
    levelUid: '',
    ticketUid: '',
  };
  return levels.map((data) => {
    const ticket = relationLevelTicket(data.id, tickets);
    (levelTicketEntity.id = data.id), (levelTicketEntity.levelName = data.name);
    levelTicketEntity.levelUid = data.levelUid;
    levelTicketEntity.ticketName = ticket.ticketName;
    levelTicketEntity.ticketPresale = ticket.ticketPresale;
    levelTicketEntity.ticketSale = ticket.ticketSale;
    levelTicketEntity.ticketUid = ticket.ticketUid;

    return { ...levelTicketEntity };
  });
};

const columns = [
  { field: 'levelName', headerName: 'Nivel', width: 140 },
  {
    field: 'ticketPresale',
    headerName: 'Preventa',
    width: 80,
  },
  {
    field: 'ticketSale',
    headerName: 'Venta',
    width: 80,
  },
  {
    field: 'action',
    headerName: 'action',
    width: 150,
  },
];

export const TicketsTableComponent = () => {
  const [normalizedLevelsTickets, setNormalizedLevelsTickets] = useState(undefined);

  const { levels, levelsStatus } = useSelector((state) => state.levels);
  const { tickets, ticketsStatus } = useSelector((state) => state.tickets);

  //***************** INITIAL dispatchs ************************** */
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetLevelsList({ commerceUid: user.commerceUid }));
    dispatch(startGetTicketsList({ commerceUid: user.commerceUid }));
  }, []);

  //********************** TICKETS normalize *************** */

  useEffect(() => {
    if (ticketsStatus.tickets == variableStatus.ok && levelsStatus.levels == variableStatus.ok) {
      const levelsTickets = arrayLevelsTickets(levels, tickets);
      setNormalizedLevelsTickets(levelsTickets ?? []);
    }
  }, [levelsStatus, ticketsStatus, tickets, levels]);

  const typegraphyFormat = (text) => {
    return (
      <Typography
        fontSize={20}
        sx={{
          display: 'flex',
          color: 'primary.main',
          fontWeight: 'bold',
        }}
      >
        {text}
      </Typography>
    );
  };

  return (
    <Grid contained paddingBottom={5}>
      {typegraphyFormat('Boletería')}

      {ticketsStatus.tickets == variableStatus.initial ||
      ticketsStatus.tickets == variableStatus.fetching ||
      !normalizedLevelsTickets ? (
        <LoadingBox />
      ) : (
        <Grid container spacing={2}>
          {normalizedLevelsTickets.map((data) => (
            <Grid item key={data.id} xs={12} sm={6} md={4} lg={3}>
              <TicketCardComponent
                id={data.id}
                name={data.levelName}
                presaleFee={data.ticketPresale}
                saleFee={data.ticketSale}
                ticketUid={data.ticketUid}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};
