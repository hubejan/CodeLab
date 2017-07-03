// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import brace from 'brace';
import { ipcRenderer } from 'electron';
import Flexbox from 'flexbox-react';
import Resizable from 'react-resizable-box';
import AceEditor from 'react-ace';

// Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';

// Required to get Material-UI tabs working
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

import 'brace/mode/javascript';
import 'brace/theme/solarized_dark';
import 'brace/ext/searchbox';
// import styles from './Home.css';
import FiletreeContainer from '../containers/FiletreeContainer';
import GitControlsContainer from '../containers/GitControlsContainer';
import { getFileName } from '../utils/file-functions';

/*
  Error with Webpack and how split is exported out, using require instead
  Keeping it here in case we might use it later

  const AceSplitEditor = require('react-ace').split;
*/

type nextPropsType = {
  contents: Array<string>,
  repositoryPath: string,
  changeEditor: () => void,
  storageLogin: () => Object
};

class Editor extends Component {
  props: {
    contents: Array<string>,
    repositoryPath: string,
    changeEditor: () => void,
    storageLogin: () => Object,
    currentOpenFiles: Array<string>,
    selectedFileIndex: number,
    loadFileFromTab: () => void
  }

  componentWillMount() {
    const token = window.localStorage.getItem('token');
    const username = window.localStorage.getItem('username');
    if (token && username) return this.props.storageLogin(token, username);
  }

  componentWillReceiveProps(nextProps: nextPropsType) {
    ipcRenderer.send('editor-changes', nextProps.contents);
  }

  render() {
    const { changeEditor, contents, currentOpenFiles, selectedFileIndex, repositoryPath, loadFileFromTab } = this.props;

    return (
      <Flexbox flexDirection="row" minHeight="100vh" flexWrap="wrap" alignContent="flex-start">

        { /* Editor tab bar */ }

        {
          /*
            PLACE HOLDER FOR COMMENTS
          */
        }

        <Flexbox element="header" height="70px" width="100vw">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
          <GitControlsContainer />
          <MuiThemeProvider>
            <Tabs value={selectedFileIndex} >
              {
                currentOpenFiles && currentOpenFiles.map((filePath, index) => (
                  <Tab
                    key={filePath}
                    label={getFileName(filePath)}
                    value={index}
                    id={filePath} // TODO: Preferably not on id but this stops throwing an error for now
                    onActive={(tab) => loadFileFromTab(tab.props.id, currentOpenFiles, contents)}
                  />
                ))
              }
            </Tabs>
          </MuiThemeProvider>
        </Flexbox>

        <Flexbox flexGrow={1} style={{ border: '1px solid gold', width: '5%', height: '90%' }}>
          <FiletreeContainer />
        </Flexbox>

        <Flexbox flexGrow={4} height={'90vh'} >
          <Resizable width={'100%'} height={'100%'}>
            <AceEditor
              mode="javascript"
              // orientation="besides"
              theme="solarized_dark"
              value={contents[selectedFileIndex]}
              height={'100%'}
              width={'100%'}
              fontSize={15}
              onChange={(newValue, event) => {changeEditor(newValue, selectedFileIndex, contents)}}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              showPrintMargin={false}
              style={{ border: '1px solid gold' }}
              wrapEnabled={Boolean(true)}
            />
          </Resizable>
        </Flexbox>

      </Flexbox>
    );
  }
}

export default Editor;
