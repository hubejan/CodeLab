// @flow
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class NewLessonForm extends Component {
  props: {
    createNewLesson: () => void,
    token: string,
    newLessonName: string,
    lessonNameChange: () => void
  };

  render() {
    const { token, newLessonName, createNewLesson, lessonNameChange } = this.props;

    return (
      <form onSubmit={(e) => { createNewLesson(e, newLessonName, token); }}>
        <TextField hintText="Lesson Name:" type="text" value={newLessonName} onChange={(e) => { lessonNameChange(e) }} />
        <RaisedButton type="submit">Submit</RaisedButton>
      </form>
    );
  }
}

