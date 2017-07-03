// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Flexbox from 'flexbox-react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import RightPanelConatiner from '../containers/RightPanelContainer';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';


const tempStyle = {
  position: 'absolute',
  top: '30%',
  left: '30%',
  textAlign: 'left'
};

const btnStyle = {
  position: 'right',
  top: '2%',
  left: '2%'
};

const style = {
  margin: 14,
};

const TicketsMenu = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Create Ticket" />
  </IconMenu>
);

export default class Home extends Component {
  props: {
    username: string,
    githubLogout: () => void
  };


  state = { open: false };

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    return (
      <Flexbox>
        <AppBar title={`Welcome back ${this.props.username.split(' ')[0]}`}>
          <Badge
            badgeContent={10}
            secondary={true}
            badgeStyle={{ top: 12, right: 12 }}
          >
            <IconButton tooltip="New Tickets">
              <NotificationsIcon />
            </IconButton>
          </Badge>
          <Toggle
            label="Questions Panel"
            defaultToggled={this.state.open}
            onToggle={this.handleToggle}
            labelPosition="right"
            style={{ margin: 20 }}
          />
          <RaisedButton onClick={this.props.githubLogout}>Logout</RaisedButton>
        </AppBar>
          <Drawer width={600} openSecondary={true} open={this.state.open} zDepth={5} >
            <AppBar
              title="Questions"
              iconElementLeft={<TicketsMenu />}
              iconElementRight={<IconButton><NavigationClose /></IconButton>}
              onRightIconButtonTouchTap={() => this.handleToggle()}
            >
              <Badge
                badgeContent={10}
                secondary={true}
                badgeStyle={{ top: 12, right: 12 }}
              >
                <IconButton tooltip="New Tickets">
                  <NotificationsIcon />
                </IconButton>
              </Badge>
            </AppBar>
          </Drawer>
        <div style={tempStyle} data-tid="container" >
          <Link to="/panelView">test the Question/History panel</Link>
          <br />
          <Link to="/lessonInit">Start A Lesson</Link>
          <br />
          <Link to="/editor">Editor</Link>
          <br />
        </div>
      </Flexbox>
    );
  }
}
