const React = require('react');

const NoteItem = React.createClass({
  formatLastUpdated: function() {
    let difference = Date.now() - Date.parse(this.props.updated_at);
    if(difference < 0.6) {
      return "JUST NOW";
    } else {
      return `${Math.ceil(difference / 86400000)} DAYS AGO`;
    }
  },

  handleSelection: function(e) {
    e.preventDefault();
    this.props.selectCurrentNote(this.props.id);
  },

  formatBody: function() {
    const html = $(this.props.body)[0];
    return html.innerText || html.textContent;
  },

  render: function() {
    return (
      <div onClick={this.handleSelection}
        className="note-card">
        <ul>
          <li>{this.props.title}</li>
          <li>{this.formatLastUpdated()}</li>
          <li>{this.formatBody()}</li>
        </ul>
      </div>
    );
  }
});

module.exports = NoteItem;
