// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';

import FiletreeContainer from '../containers/FiletreeContainer';
import GitControlsContainer from '../containers/GitControlsContainer';
import EditorContainer from '../containers/EditorContainer';
import UserRepositoriesContainer from '../containers/UserRepositoriesContainer';
import Flexbox from 'flexbox-react';

import type { lessonSessionStateType, lessonInfoType } from '../reducers/lessonSession-reducer';


class LessonSession extends Component {

  props: {
    userRepositories: Array<Object>,
    loadUserRepos: () => void,
    selectedRepository: {},
    lessonInfo: lessonInfoType
  };

  render() {
    const { userRepositories, selectedRepository, lessonInfo } = this.props;

    return (
      <Flexbox>
        <EditorContainer />
      </Flexbox>
    );
  }
}

export default LessonSession;
