// @flow
import { ADD_TICKET, SELECT_TICKET, REMOVE_TICKET } from '../actions/tickets-actions';
import type { ticketType } from '../actions/tickets-actions';

// breaking down flow syntax:
// state can have a selectedTicket property that is either {} or a ticket
// state is an object that will be used as a map
//   this map can have numbers as keys (ticket_id is for semantic documentation)
//   this map can have values of ticketType
export type ticketsStateType = {
  selectedTicket: {} | ticketType,
  [ticket_id: string | number]: ticketType
};

type addAction = { type: typeof ADD_TICKET, id: number, ticket: ticketType };
type selectAction = { type: typeof SELECT_TICKET, id: number };
type removeAction = { type: typeof REMOVE_TICKET, id: number };

type Action =
  | addAction
  | selectAction
  | removeAction;

const defaultTickets = {
  selectedTicket: {}
};

export default function tickets(state: ticketsStateType = defaultTickets, action: Action) {
  switch (action.type) {
    case ADD_TICKET:
      return {
        ...state,
        [action.id]: action.ticket
      };
    case SELECT_TICKET:
      return {
        ...state,
        selectedTicket: action.id ? state[action.id] : {}
      };
    case REMOVE_TICKET:
      return {
        state,
        [action.id]: undefined
      };
    default:
      return state;
  }
}
