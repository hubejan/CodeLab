// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';

import UserRepositoriesContainer from '../containers/UserRepositoriesContainer';
import NewLessonFormContainer from '../containers/NewLessonFormContainer';

import styles from './UserRepositories.css';
import { lessonInfoType } from '../reducers/lessonSession-reducer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/arrow-back';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Flexbox from 'flexbox-react';

const style = {
  margin: 12,
};

export default class LessonInit extends Component {
  props: {
    userRepositories: Array<Object>,
    selectedRepository: {},
    lessonInfo: lessonInfoType,
    token: string,
    getUserRepositories: () => void,
    createNewLesson: () => void
  };

  state = {
    open: false,
  };

  componentDidMount() {
    this.props.getUserRepositories(this.props.token);
  }

  handleOpen = () => { this.setState({ open: true }); };
  handleClose = () => { this.setState({ open: false }); };

  render() {
    const { userRepositories, selectedRepository, lessonInfo, createNewLesson, token, open } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    // TODO: Re-route to Editor after creating/selecting a lesson
    return (
      <div>
        <AppBar title="Create A Lesson"
              showMenuIconButton="false"
              iconElementLeft={<IconButton><Link to="/"><NavigationClose /></Link></IconButton>}
              onLeftIconButtonTouchTap={()=>{}}
        >
          <RaisedButton label="Load from Local" style={style} onClick={() => { this.handleOpen(); }} />
        </AppBar>
        <Dialog title="Load from Local"
                actions={actions}
                modal={true}
                open={this.state.open}
        >
          <NewLessonFormContainer />
        </Dialog>
        <Flexbox>
          <UserRepositoriesContainer
            repositories={userRepositories}
            selectedRepository={selectedRepository}
          />
        </Flexbox>
      </div>
    );
  }
}

