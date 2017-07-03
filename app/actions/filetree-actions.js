import Username from 'username';
import { ipcRenderer } from 'electron';

import { readFile } from '../utils/FileSystemUtils';
import { loadFileFromTree } from './editor-actions';

export const GOT_USERNAME = 'GOT_USERNAME';
export const OPEN_FILE = 'OPEN_FILE';
export const XMIT_FILE = 'XMIT_FILE';
export const FILETREE_CHANGE = 'FILETREE_CHANGE';

type actionType = {
  type: string
};

export type selectedFileType = {
  filePath: string,
  isDirectory: boolean
};

export const gotUsername = username => ({ type: GOT_USERNAME, username });
export const openFile = newEditorState => ({ type: OPEN_FILE, newEditorState });
export const xmitFile = contents => ({ type: XMIT_FILE, contents });
export const filetreeChange = (filetree: Object[]) => ({ type: FILETREE_CHANGE, filetree });

export function getUsername() {
  return (dispatch: (action: actionType) => void) => {
    Username().then(name => dispatch(gotUsername(name)))
      .catch(console.error);
  };
}

export function loadNewFile(selectedFile: selectedFileType, currentOpenFiles: Array<string>, currentEditorValues: Array<string>) {
  return (dispatch: (action: actionType) => void) => {
    const loadedFilePath = selectedFile.filePath;

    // Load an already-opened file
    if (currentOpenFiles.includes(loadedFilePath)) {
      return dispatch(loadFileFromTree.apply(null, arguments));
    }

    // Opening a new file, load it into the Editor
    // TODO: Need to sync active tab with this newly opened file
    readFile(selectedFile.filePath)
      .then(contents => {
        const allOpenFiles = currentOpenFiles.concat(loadedFilePath);
        const text = contents.toString();
        const newEditorValues = currentEditorValues.concat([text]);
        const indexOfNewFile = currentOpenFiles.length; // New file gets pushed to end of array (zero-based indexing)
        const newEditorState = {
          contents: newEditorValues,
          currentOpenFiles: allOpenFiles,
          selectedFileIndex: indexOfNewFile
        };
        return dispatch(openFile(newEditorState)); // TODO: Consider moving openFile to editor?
      })
      .catch(console.error);
  };
}

export function reqAndXmitFile(filePath) {
  console.log('ffff')
  readFile(filePath)
    .then(contents => {
      const text = contents.toString();
      console.log('xmiting file: ', text);
      return ipcRenderer.send('xmit-file', text);
    })
    .catch(console.error);
}

export function setFiletree(tree: Object) {
  console.log('before emit: ', tree);
  ipcRenderer.send('xmit-tree', tree);
  return filetreeChange(tree);
}
