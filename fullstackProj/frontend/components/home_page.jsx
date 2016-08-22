const React = require('react');
const NotebookActions = require('../actions/notebook_actions.js');
const NotebookStore = require('../stores/notebook_store.js');
const CurrentNotebookStore = require('../stores/current_notebook_store.js');
const NotesBar = require('./notes_bar.jsx');
const LeftNavBar = require('./left_nav_bar.jsx');
const NotebookBar = require('./notebook_bar.jsx');
const NoteStore = require('../stores/note_store.js');
const NoteActions = require('../actions/note_actions.js');

const HomePage = React.createClass({
  getInitialState: function() {
    return {
      // notebooks: NotebookStore.allNotebooks(),
      currentNotebook: CurrentNotebookStore.currentNotebook(),
    // current_notebook_open: false
      notes: NoteStore.allNotes(),
    //   tags: ,
    //   current_note: ,
    //   create_note_modal_open: false,
      SelectNotebookModalOpen: false,
    //   tags_modal_open: false,
    };
  },

  componentWillMount: function() {
    NotebookActions.getAllNotebooks();
    NoteActions.getAllNotes();
  },

  componentDidMount: function() {
    // this.notebookListener = NotebookStore.addListener(this.updateNotebooks);
    this.currentNotebookListener = CurrentNotebookStore.addListener(this.updateCurrentNotebook);
    this.noteListener = NoteStore.addListener(this.updateNotes);
  },

  updateNotes: function() {
    this.setState({ notes: this.controlNotesProps() });
  },

  updateCurrentNotebook: function() {
    this.setState({ currentNotebook: NotebookStore.currentNotebook });
  },

  updateNotebooks: function() {
    this.setState({ notebooks: NotebookStore.allNotebooks() });
  },

  componentWillUnmount: function() {
    this.currentNotebookListener.remove();
  },

  openSelectNotebookModal: function() {
    this.setState({ SelectNotebookModalOpen: true });
  },

  closeSelectNotebookModal: function() {
    // debugger;
    this.setState({ SelectNotebookModalOpen: false });
  },

  createCurrentNotebookBar: function() {
    return <CurrentNotebookBar notes={ this.controlNotesProps() }/>;
  },

  controlSelectNotebookModal: function() {
    if(this.state.SelectNotebookModalOpen) {
      return (
        <NotebookBar
          isOpen={ this.state.SelectNotebookModalOpen }
          closeSelectNotebookModal={ this.closeSelectNotebookModal }
          />
      );
    }
  },

  controlNotesProps: function() {
    if(Object.keys(this.state.currentNotebook).length > 0) {
      return NoteStore.allNotebookNotes();
    } else {
      return NoteStore.allNotes();
    }
  },

  createNotesComp: function() {
    if(Object.keys(this.state.notes).length > 0) {
      return <NotesBar notes={this.state.notes} />;
    }
  },

  render: function() {
    return (
      <div>
        <LeftNavBar
          SelectNotebookModalOpen={this.state.SelectNotebookModalOpen}
          openSelectNotebookModal={this.openSelectNotebookModal}
          closeSelectNotebookModal={this.closeSelectNotebookModal}
          />

        <div>Home Page dawg</div>
        { this.createNotesComp() }
        { this.controlSelectNotebookModal() }

      </div>
    );
  }
});

module.exports = HomePage;
