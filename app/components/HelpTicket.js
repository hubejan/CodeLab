// @flow
import React from 'react';
import type { ticketType } from '../actions/tickets-actions';
import Flexbox from 'flexbox-react';

// just a skeleton, not sure how tickets will actually be represented yet
const HelpTicket = ({ ticket }: {ticket: ticketType}) => (
  <Flexbox>
    <pre>{`${ticket.question}`}</pre>
  </Flexbox>
);

export default HelpTicket;
