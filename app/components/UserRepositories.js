import React, { Component } from 'react';
import { shell } from 'electron';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import RepositoryPanel from './RepositoryPanel';
// import styles from './UserRepositories.css';

export default class UserRepositories extends Component {
  props: {
    repositories: Array<Object>,
    openRepoLink: (repoLink: string, event: Object) => void,
    loadLesson: (repoLink: string) => void,
    selectRepository: () => void
  };

  render() {
    const { repositories, openRepoLink, loadLesson, selectRepository } = this.props;

    return (
      <Table fixedHeader={true} selectable={true} >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn colSpan="4" tooltip="Load from Github" style={{ textAlign: 'center' }}>
                <h3>Load from Github</h3>
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn tooltip="Repository Name">Name</TableHeaderColumn>
            <TableHeaderColumn tooltip="Repository url">URL</TableHeaderColumn>
            <TableHeaderColumn tooltip="Last updated">Updated</TableHeaderColumn>
            <TableHeaderColumn tooltip="Actions">Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody showRowHover={true} stripedRows={true} >
          {
            repositories &&
            repositories.map(repository => (
                <RepositoryPanel
                  key={repository.id}
                  repository={repository}
                  openRepoLink={openRepoLink}
                  loadLesson={loadLesson}
                  selectRepository={selectRepository}
                />
            ))
          }
        </TableBody>
      </Table>
    );
  }
}
