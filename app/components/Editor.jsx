// @flow
import React, { Component } from 'react';
import brace from 'brace';
import { ipcRenderer } from 'electron';
import Flexbox from 'flexbox-react';
import AceEditor from 'react-ace';
import SplitPane from 'react-split-pane';

import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import { Tab, Tabs } from 'material-ui/Tabs';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/ext/searchbox';
import FiletreeContainer from '../containers/FiletreeContainer';

import RightPanelContainer from '../containers/RightPanelContainer';
import EditorNavContainer from '../containers/EditorNavContainer';

import { getLastFromPath } from '../utils/file-functions';
import { yellow } from '../public/colors';

const style = {

};

const snackTextStyles = {
  textAlign: 'center',
  fontSize: '15px',
  fontWeight: '600'
};

const snackBgStyles = {
  backgroundColor: yellow
};

type nextPropsType = {
  contents: Array<string>,
  repositoryPath: string,
  changeEditor: () => void,
  storageLogin: () => Object,
  selectedFileIndex: number,
  currEditorVal?: string
};

class Editor extends Component {
  props: {
    contents: Array<string>,
    repositoryPath: string,
    changeEditor: () => void,
    storageLogin: () => Object,
    currentOpenFiles: Array<string>,
    selectedFileIndex: number,
    loadFileFromTab: () => void,
    unread?: Array<Object>,
    currEditorVal?: string
  };

  constructor(props) {
    super(props);
    this.state = { open: false, editorSize: '30vw', data: '', data2: ''};
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentWillMount() {
    const token = window.localStorage.getItem('token');
    const username = window.localStorage.getItem('username');
    if (token && username) return this.props.storageLogin(token, username); // eslint-ignore-line
  }

  componentWillReceiveProps(nextProps: nextPropsType) {
    if (nextProps.unread.length > this.props.unread.length) this.setState({ open: true });
    ipcRenderer.send('editor-changes', nextProps.currEditorVal);
  }

  handleResize = (size) => this.setState({ editorSize: size });

  handleRequestClose() {
    this.setState({ open: false });
  }

  render() {
    const { changeEditor, contents, currentOpenFiles, selectedFileIndex, unread, loadFileFromTab } = this.props;

    return (
      <div>
        <RightPanelContainer />
        <Flexbox flexDirection="row" minHeight="100vh" flexWrap="wrap" alignContent="flex-start">
          <EditorNavContainer />
          <Flexbox height="70px" width="100vh" />
          <Flexbox flexDirection="row" justifyContent="space-around">
            <div>
              <SplitPane split="vertical" defaultSize="240px" onChange={this.handleResize} >
                <Paper style={style} zDepth={2}>
                  <FiletreeContainer directory={'/'} socket={this.socket} />
                </Paper>
                  <Paper style={style} zDepth={2} >
                    <Tabs value={selectedFileIndex} >
                      {
                        currentOpenFiles && currentOpenFiles.map((filePath, index) => (
                          <Tab
                            key={filePath}
                            label={getLastFromPath(filePath)}
                            value={index}
                            id={filePath} // TODO: Preferably not on id but this stops throwing an error for now
                            onActive={(tab) => loadFileFromTab(tab.props.id, currentOpenFiles, contents)}
                            style={{
                              color: 'white'
                            }}
                          />
                        ))
                      }
                    </Tabs>
                    <AceEditor
                      value={contents[selectedFileIndex]}
                      mode="javascript"
                      theme="monokai"
                      width={'100%'}
                      height="920px"
                      onChange={(newValue, event) => { changeEditor(newValue, selectedFileIndex, contents)} }
                      name="UNIQUE_ID_OF_DIV"
                      wrapEnabled={true}
                      editorProps={{ $blockScrolling: Infinity }}
                      showPrintMargin={false}
                    />
                  </Paper>
              </SplitPane>
            </div>
          </Flexbox>
        </Flexbox>
        <Snackbar
          open={this.state.open}
          message={`You have ${unread.length} unread help ticket${unread.length > 1 ? 's' : ''}`}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          bodyStyle={snackTextStyles}
          style={snackBgStyles}
        />
      </div>
    );
  }
}

export default Editor;
