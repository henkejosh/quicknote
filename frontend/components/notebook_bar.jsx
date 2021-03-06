const React = require('react');
const Modal = require('react-modal');
const NotebookBarModStyle = require('../misc/notebook_bar_modstyle.js');
const NotebookBarItem = require('./notebook_bar_item.jsx');
const NotebookStore = require('../stores/notebook_store.js');
const NotebookActions = require('../actions/notebook_actions.js');

const NotebookBar = React.createClass({
  getInitialState: function() {
    return {
      notebooks: NotebookStore.allNotebooks(),
      notebookEditorOpen: false
    };
  },

  componentDidMount: function() {
    this.notebookStoreListener = NotebookStore.addListener(this.updateNotebooks);
  },

  updateNotebooks: function() {
    this.setState({ notebooks: NotebookStore.allNotebooks() });
  },

  componentWillMount: function() {
    NotebookActions.getAllNotebooks();
  },

  componentWillUnmount: function() {
    this.notebookStoreListener.remove();
  },

  handleDisplay: function() {
    if(this.props.notebookBarIsOpen) {
      return "block";
    } else {
      return "none";
    }
  },

  openNotebookCreator: function(e) {
    e.preventDefault();
    this.props.openNotebookCreator();
  },

  render: function() {
    const that = this;
    return (
      <div className="notebook-modal-anim" display={this.handleDisplay}>

        <div className="notebook-modal">
          <div className="notebook-header">
            <a className="modal-type notebook">NOTEBOOKS</a>

            <div className="create-notebook-icon"
              onClick={this.openNotebookCreator}>

              <i className="fa fa-book add-book" aria-hidden="true"></i>
              <i className="fa fa-plus add-book" aria-hidden="true" />
            </div>

          </div>

          { Object.keys(that.state.notebooks).map( id => {
              let notebook = that.state.notebooks[id];
              return (
                < NotebookBarItem key={id}
                    title={notebook.title}
                    user_id={notebook.user_id}
                    id={notebook.id}
                    changeCardColumnToNotebook={this.props.changeCardColumnToNotebook}
                    changeCardColumnToAllCards={this.props.changeCardColumnToAllCards}
                    closeSelectNotebookModal={this.props.closeSelectNotebookModal}
                    notebooks={this.state.notebooks}
                  />
              );
            })
          }

        </div>
      </div>
    );
  }
});

module.exports = NotebookBar;
