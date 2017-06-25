// @flow
export const ADD_TICKET = 'ADD_TICKET';
export const SELECT_TICKET = 'SELECT_TICKET';
export const REMOVE_TICKET = 'REMOVE_TICKET';

// codestate subject to change- still unsure how we are storing
// current state of code
// student-side will need some form of create-ticket
// discussion: what kinds of props should a ticket have?
export type ticketType = {
  id: number,
  question: string,
  codeState?: string
};

// actions set up such that tickets can be selected/removed by ID
// should allow simple add/click/remove later on
export function add(ticket: ticketType) {
  return {
    type: ADD_TICKET,
    id: ticket.id,
    ticket
  };
}

export function select(ticket: ticketType) {
  return {
    type: SELECT_TICKET,
    id: ticket.id
  };
}

export function remove(ticket: ticketType) {
  return {
    type: REMOVE_TICKET,
    id: ticket.id
  };
}
