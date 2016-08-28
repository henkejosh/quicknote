const Dispatcher = require('../dispatcher/dispatcher.js');
const TagApiUtil = require('../util/tag_api_util');
const TagConstants = require('../constants/tag_constants.js');
const hashHistory = require('react-router').hashHistory;
const CurrentNoteActions = require('./current_note_actions');
// const NoteActions = require('./note_actions.js');
// import * as NoteActions from "./note_actions.js";

const TagActions = {
  createTag: function(tag, noteID) {
    TagApiUtil.createTag(tag, noteID, this.receiveTag);
  },

  getAllTags: function() {
    TagApiUtil.getAllTags(this.receiveTags);
  },

  receiveTag: function(tag, noteID) {
    // debugger;
    Dispatcher.dispatch({
      actionType: TagConstants.RECEIVE_TAG,
      tag: tag
    });

    if(noteID) CurrentNoteActions.selectCurrentNote(noteID);
  },

  receiveTags: function(tags) {
    Dispatcher.dispatch({
      actionType: TagConstants.RECEIVE_ALL_TAGS,
      tags: tags
    });
  },

  deleteTag: function(tag) {
    TagApiUtil.deleteTag(tag, this.removeTagFromStore);
  },

  removeTagFromStore: function(tagID) {
    Dispatcher.dispatch({
      actionType: TagConstants.REMOVE_TAG,
      tagID: tagID
    });
    // debugger;
    // NoteActions.getAllNotes();
  },

  destroyRelationship: function(tagID, noteID) {
    TagApiUtil.destroyRelationship(tagID, noteID, this.updateNotesAndTags);
  },

  updateNotesAndTags: function(newNote, newTag) {
    Dispatcher.dispatch({
      actionType: TagConstants.UPDATE_NOTE_AND_TAG,
      tag: newTag,
      note: newNote
    });
  },

  selectCurrentTag: function(tag, noteID) {
    // TagApiUtil.selectCurrentTag(tag, this.receiveTag);
    Dispatcher.dispatch({
      actionType: TagConstants.RECEIVE_CURRENT_TAG,
      tag: tag
    });

    if(noteID) CurrentNoteActions.selectCurrentNote(noteID);
  }
};

module.exports = TagActions;
