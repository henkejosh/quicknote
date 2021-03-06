const React = require('react');
const ReactQuill = require('react-quill');
const NoteActions = require('../actions/note_actions.js');
const NotebookDropdown = require('./notebook_dropdown.jsx');
const NotebookStore = require('../stores/notebook_store.js');
const TagsBarIndex = require('./tags_bar_index.jsx');

const NoteEditor = React.createClass({
  getInitialState: function() {
    return {
      title: this.props.currentNote.title,
      body: this.props.currentNote.body,
      notebookSelectorOpen: false,
      notebookTitle: "",
      notebook_id: ""
    };
  },

  componentWillReceiveProps: function() {
    let notebook = this.findNotebook();
    if(!notebook) {
      notebook = this.props.currentNotebook;
    }
    this.setState({
      title: this.props.currentNote.title,
      body: this.props.currentNote.body,
      notebookTitle: notebook.title,
      notebook_id: notebook.id
    });
  },

  findNotebook: function() {
    return NotebookStore.findNotebook(this.props.currentNote.notebook_id);
  },

  handleSubmit: function(e) {
    e.preventDefault();
  },

  componentDidMount: function() {
    let notebook = this.findNotebook();
    if(!notebook) {
      notebook = this.props.currentNotebook;
    }
    this.setState({
      title: this.props.currentNote.title,
      body: this.props.currentNote.body,
      notebookTitle: notebook.title,
      notebook_id: notebook.id
    });
  },

  saveChanges: function() {
    let note = this.props.currentNote;
    note.body = this.state.body;
    note.title = this.state.title;
    note.notebook_id = this.state.notebook_id;
    note = note;
    NoteActions.updateNote(note);
  },

  autoSave: function() {
    this.saveTimeout = setTimeout(this.saveChanges, 500);
  },

  updateTitle: function(e) {
    e.preventDefault();
    if(this.saveTimeout) clearTimeout(this.saveTimeout);
    this.setState({ title: e.target.value});
    this.autoSave();
  },

  updateNotebook: function() {
    if(this.saveTimeout) clearTimeout(this.saveTimeout);
    const note = this.props.currentNote;
    NoteActions.changeNoteNotebook(note);
  },

  updateBody: function(text) {
    this.setState({ "body": text});
    if(this.saveTimeout) clearTimeout(this.saveTimeout);
    this.autoSave();
  },

  createNotebookDropdownSelector: function() {
    if(this.state.notebookSelectorOpen) {
      return (
        <NotebookDropdown currentNotebook={this.state.notebookTitle}
          notebooks={this.props.notebooks}
          closeNotebookSelector={this.closeNotebookSelector}
          openNotebookSelector={this.openNotebookSelector}
          notebookSelectorOpen={this.state.notebookSelectorOpen}
          currentNote={this.props.currentNote}
          updateNotebook={this.updateNotebook}
          />
      );
    }
  },

  closeNotebookSelector: function() {
    this.setState({ notebookSelectorOpen: false });
  },

  openNotebookSelector: function() {
    this.setState({ notebookSelectorOpen: true });
  },

  handleNotebookSelectorOpen: function(e) {
    e.preventDefault();
    this.openNotebookSelector();
  },

  handleNotebookSelectorClose: function(e) {
    e.preventDefault();
    this.closeNotebookSelector();
  },

  toggleNotebookSelector: function(e) {
    e.preventDefault();
    this.state.notebookSelectorOpen ? this.closeNotebookSelector() :
      this.openNotebookSelector();
  },

  render: function() {
    return (
      <form className="note-editor-page">


        <div className="top-toolbar">

            <div className="curr-notebook-selector"
              onClick={this.toggleNotebookSelector}>
              <i className="fa fa-book grey-book" aria-hidden="true"></i>
              <p className="curr-nb-title">{this.state.notebookTitle}</p>
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </div>

            <div onMouseLeave={this.handleNotebookSelectorClose}
              className="dropdown-placeholder">
              { this.createNotebookDropdownSelector() }
            </div>

            <TagsBarIndex currentUserID={this.props.currentUserID}
              currentNote={this.props.currentNote}/>

        </div>

        <input className="note-title"
          onChange={this.updateTitle}
          value={this.state.title} />

        <ReactQuill theme='snow'
                  onChange={ this.updateBody }
                  value={ this.state.body }/>

      </form>
    );
  }
});

module.exports = NoteEditor;
