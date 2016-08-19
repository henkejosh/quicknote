const React = require('react');
const SignInModal = require('./sign_in_modal.jsx');
const Modal = require('react-modal');
const SessionActions = require('../actions/session_actions.js');
const SessionStore = require('../stores/session_store.js');

const App = React.createClass({
  getInitialState: function() {
    return { signInModal: false, modalType: "Sign in" };
  },

  openSignInModal: function() {
    this.setState({ signInModal: true });
  },

  closeSignInModal: function() {
    this.setState({ signInModal: false });
  },

  makeModalSignUp: function() {
    this.setState({ modalType: "Sign up" });
  },

  makeModalSignIn: function() {
    this.setState({ modalType: "Sign in"});
  },

  controlSignInModal: function() {
    if(this.state.signInModal) {
      return <SignInModal isOpen={ this.state.signInModal }
        closeSignInModal={this.closeSignInModal}
        modalType={this.state.modalType}/>;
    }
  },

  switchModalType: function() {
    if(this.state.modalType === "Sign up") {
      this.makeModalSignIn();
    } else {
      this.makeModalSignUp();
    }
  },

  componentWillMount: function() {
    Modal.setAppElement(document.getElementById("root"));
  },

  logout: function(e) {
    e.preventDefault();
    SessionActions.logout();
  },

  render: function() {
    return (
      <div>

        { this.controlSignInModal() }

        <p>Howdy there. Back to square 1.</p>

        <h3>{this.state.modalType}</h3>
        <div className="openModal"
          onClick={this.openSignInModal} />
        <div className="closeModal"
          onClick={this.switchModalType} />
        <p className="log-out"
          onClick={this.logout}>Log Out</p>
      </div>
    );
  }
});

module.exports = App;
