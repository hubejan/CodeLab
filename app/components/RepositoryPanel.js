import React, { Component } from 'react';
// import styles from './UserRepositories.css';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Flexbox from 'flexbox-react';
import FontIcon from 'material-ui/FontIcon';

const styles = {
  button: {
    margin: 14,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};


export default class UserRepositories extends Component {
  props: {
    repository: Object,
    openRepoLink: () => void,
    selectRepository: () => void,
    loadLesson: () => void
  };

  render() {
    const { repository, openRepoLink, selectRepository, loadLesson } = this.props;
    const updatedAtObj = new Date(repository.updated_at);
    const updatedAtUTC = updatedAtObj.toUTCString();
    const updatedAtString = `${updatedAtUTC}`;

    return (
      <TableRow key={repository.id}>
        <TableRowColumn>{ repository.name }</TableRowColumn>
        <TableRowColumn>{ repository.html_url }</TableRowColumn>
        <TableRowColumn>{ updatedAtString }</TableRowColumn>
        <TableRowColumn>
          <RaisedButton
            icon={<FontIcon className="muidocs-icon-custom-github" />}
            onClick={(e) => { openRepoLink(repository.html_url, e); }}
          > View on Github </RaisedButton>
          <RaisedButton
            onClick={() => {
              loadLesson(repository.html_url);
            }}
          > Load Lesson </RaisedButton>
          <RaisedButton
            onClick={() => { selectRepository(repository); }}
          > Select </RaisedButton>
        </TableRowColumn>
      </TableRow>
    );
  }
}
