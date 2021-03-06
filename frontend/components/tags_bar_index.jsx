const React = require('react');
const TagsBarItem = require('./tags_bar_item.jsx');
const TagActions = require('../actions/tag_actions.js');
const ReactTags = require('react-tag-input').WithContext;

const TagsBarIndex = React.createClass({
  getInitialState: function() {
    return { title: "" };
  },

  createCurrentNoteTags: function() {
    if(!this.props.currentNote.tags) return;

    return this.props.currentNote.tags.map( tag => {
     return (
         <TagsBarItem key={tag.id} tag={tag}
          className="current-note-tag"
          title={tag.title}
          currentNote={this.props.currentNote}
           />
       );
     });
  },

  resetTitle: function() {
    this.setState({ title: "" });
  },

  handleTitleChange: function(e) {
    e.preventDefault();
    this.setState({ title: e.target.value });
  },

  handleDelete: function(e) {
    e.preventDefault();
    this.props.tag.taggings.forEach( tagging => {
      if(tagging.tag_id === this.props.tag.id &&
        tagging.note_id ===this.props.currentNote.id) {
        TagActions.destroyRelationship(this.props.tag.id, tagging.id);
      }
    });
  },

  createTag: function(e) {
    if(this.state.title === "") return;

    if(e.key === "Enter") {
      const tag = { title: this.state.title,
        user_id: this.props.currentUserID };
      TagActions.createTag(tag, this.props.currentNote.id);
      this.resetTitle();
    }
  },

  componentWillUpdate: function() {
    this.resizeInput();
  },

  resizeInput: function() {
    $(".tag-creator").width((this.state.title.length + 1) * 7);
  },

  formatTags: function() {
    let tags = this.props.currentNote.tags;
    return tags.map(tag => {
      return { id: tag.id, text: tag.title };
    });
  },

  render: function() {
    return (
      <section className="tag-bar">
        <div className="tag-selector">
          <i id="tag"
            className="fa fa-tag grey-tag" aria-hidden="true"></i>
        </div>
        <ul className="tag-list">

        <div className="tag-namer">
          <input type="text"
            onKeyPress={this.createTag}
            className="tag-creator"
            onChange={this.handleTitleChange}
            placeholder="New tag..."
            value={this.state.title}
            />
          </div>
            { this.createCurrentNoteTags() }
        </ul>
      </section>
    );
  }
});

module.exports = TagsBarIndex;
