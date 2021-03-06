const React = require('react');
const TagActions = require('../actions/tag_actions.js');
const NoteActions = require('../actions/note_actions.js');
const CurrentNoteActions = require('../actions/current_note_actions.js');

const TagModalCard = React.createClass({
  handleSelection: function(e) {
    e.preventDefault();
    let noteID;
    if(this.props.tag.note_ids.length > 0) {
      noteID = this.props.tag.note_ids[0].id;
    }
    
    TagActions.selectCurrentTag(this.props.tag, noteID);
    this.props.closeSelectTagModal();
  },

  formatNoteCount: function() {
    if(this.props.tag.note_ids) {
      return this.props.tag.note_ids.length;
    } else {
      return "0";
    }
  },

  deleteTag: function(e) {
    e.preventDefault();
    TagActions.deleteTag(this.props.tag);
    NoteActions.getAllNotes();
  },

  render: function() {
    return (
      <div className="outer-tag">
        <div onClick={this.handleSelection}
        className="current-note-tag"
        >{this.props.title}<p
          className="tag-note-count">{this.formatNoteCount()}</p></div>

        <i className="fa fa-trash-o delete-tag-modal-icon"
          onClick={this.deleteTag}
          aria-hidden="true" />
      </div>
    );
  }
});

module.exports = TagModalCard;
