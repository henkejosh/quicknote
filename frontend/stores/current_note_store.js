"use strict";

const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const NoteConstants = require('../constants/note_constants.js');
const CurrentNoteConstants = require('../constants/current_note_constants.js');
const hashHistory = require('react-router').hashHistory;
const NotebookStore = require('./notebook_store.js');
const CurrentNotebookConstants = require("../constants/current_notebook_constants.js");
const NotebookConstants = require("../constants/notebook_constants.js");
const NoteStore = require("./note_store.js");
const TagConstants = require('../constants/tag_constants.js');

const CurrentNoteStore = new Store(Dispatcher);

let _currentNote = {};

const _setCurrentNote = function(note) {
  // _currentNote[note.id] = note;
  _currentNote = note;
};

const _getNotebookNoteFromNoteStore = function(notestore) {
  // debugger;
  const notes = notestore.allNotebookNotes();
  if(Object.keys(notes).length === 0) { return {};}
  _bootstrapCurrentNote(notes);
};

const _chooseLastNote = function(notes) {
  const ids = Object.keys(notes);
  const lastID = Math.max.apply(null, ids);
  // _currentNote[lastID] = notes[lastID];
  _currentNote = notes[lastID];
};

const _bootstrapCurrentNote = function(notes) {
  // if(Object.keys(_currentNote).length === 0) {
    _chooseLastNote(notes);
  // }
};

const _bootstrapCurrentNoteFromArray = function(currentNotebook) {
  const notes = currentNotebook.notes;
  if(notes.length > 0) {
    let note = notes[0];
    note.notebook_id = currentNotebook.id;
    _currentNote = note;
  } else {
    _currentNote = {};
  }
};

const _removeNote = function(noteID) {
  if(_currentNote.id === noteID) _currentNote = {};
};

const _resetStore = function() {
  _currentNote = {};
};

const _updateNoteFromTag = function(tag) {
  // if(_currentNote.id === tag.)
};

CurrentNoteStore.forceUpdateCurrentNote = function(notes) {
  _bootstrapCurrentNote(notes);
};

CurrentNoteStore.resetCurrentNote = function(notes) {
  _currentNote = {};
  // debugger;
  _bootstrapCurrentNoteFromArray(notes);
};

CurrentNoteStore.currentNote = function() {
  return Object.assign({}, _currentNote);
};

CurrentNoteStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case CurrentNoteConstants.RECEIVE_CURRENT_NOTE:
      _setCurrentNote(payload.currentNote);
      CurrentNoteStore.__emitChange();
      break;
    case NoteConstants.RECEIVE_ALL_NOTES:
      _bootstrapCurrentNote(payload.notes);
      CurrentNoteStore.__emitChange();
      break;
    case NoteConstants.REMOVE_NOTE:
      _removeNote(payload.noteID);
      CurrentNoteStore.__emitChange();
      break;
    case NoteConstants.RECEIVE_NOTE:
      _setCurrentNote(payload.note);
      CurrentNoteStore.__emitChange();
      break;
    case CurrentNotebookConstants.RECEIVE_CURRENT_NOTEBOOK:
    //
      _bootstrapCurrentNoteFromArray(payload.currentNotebook);
      CurrentNoteStore.__emitChange();
      break;
    case NotebookConstants.RECEIVE_NOTEBOOK:
      _resetStore();
      CurrentNoteStore.__emitChange();
      break;
    // case TagConstants.RECEIVE_TAG:

    // case NoteConstants.RECEIVE_NOTE_NEW_NOTEBOOK:
    //   _getNotebookNoteFromNoteStore(NoteStore);
    //   CurrentNoteStore.__emitChange();
    //   break;
  }
};

module.exports = CurrentNoteStore;