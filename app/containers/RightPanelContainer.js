// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HelpTicketPanel from '../components/HelpTicketPanel';
import { add, select, remove } from '../actions/tickets-actions';
import type { ticketsStateType } from '../reducers/tickets-reducer';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

function mapStateToProps(state) {
  return {
    panelView: state.panelView,
    ticketsState: state.tickets
  };
}

function mapDispatchToProps(dispatch: *) {
  return {
    addTicket(ticket) {
      dispatch(add(ticket));
    },
    selectTicket(ticket) {
      dispatch(select(ticket));
    },
    removeTicket(ticket) {
      dispatch(remove(ticket));
    }
  };
}

class RightPanelContainer extends Component {
  props: {
    panelView: string,
    ticketsState: ticketsStateType,
    addTicket: () => void,
    selectTicket: () => void,
    removeTicket: () => void
  };

  render() {
    const { panelView, ticketsState, addTicket, selectTicket, removeTicket, open } = this.props;

    return (
      <div>
        <Drawer width={400} openSecondary={true} open={open} >
          <AppBar title="AppBar" />
        </Drawer>


        <Link to="/">
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
        <h1>RIGHT PANEL CONTAINER</h1>
        {
          panelView === 'HelpTickets'
            ? <HelpTicketPanel
              ticketsState={ticketsState}
              selectTicket={selectTicket}
              removeTicket={removeTicket}
            />
            : null // fill with History later
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanelContainer);
