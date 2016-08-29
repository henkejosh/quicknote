const React = require('react');
const NoteActions = require('../actions/note_actions.js');

const NoteItem = React.createClass({
  formatLastUpdated: function() {
    let difference = Date.now() - Date.parse(this.props.updated_at);
    if(difference < 0.6) {
      return "JUST NOW";
    } else {
      return `${Math.ceil(difference / 86400000)} DAYS AGO`;
    }
  },

  // componentWillReceiveProps: function(nextProps) {
  //   if(!nextProps.currentNote) return;
  //   if(nextProps.currentNote.id === this.props.id) {
  //     $(".note-card").;
  //   }
  // },

  deleteNote: function(e) {
    e.preventDefault();
    NoteActions.deleteNote(this.props.id);
    e.stopPropagation();
  },

  formatIfCurrentNote: function() {
    if(!this.props.currentNote) return false;
    // debugger;
    if(this.props.currentNote.id === this.props.id) {
      return <div className="selected-note-card" />;
    }
  },

  handleSelection: function(e) {
    e.preventDefault();
    this.props.selectCurrentNote(this.props.id);
  },

  formatBody: function() {
    if(!this.props.body) return;
    const html = $(this.props.body)[0];
    return html.innerText || html.textContent;
  },

  render: function() {
    return (
      <div onClick={this.handleSelection}
        className="note-card">
        { this.formatIfCurrentNote() }
        <ul>
          <li className="card-title">{this.props.title}</li>
          <li className="card-timestamp">{this.formatLastUpdated()}</li>
          <li className="card-body">{this.formatBody()}</li>
        </ul>

        <i className="fa fa-trash-o"
          onClick={this.deleteNote}
          aria-hidden="true">
        </i>

        <div className="note-card-line-break" />
      </div>
    );
  }
});

module.exports = NoteItem;
