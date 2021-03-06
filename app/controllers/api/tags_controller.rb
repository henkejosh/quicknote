class Api::TagsController < ApplicationController
  def index
    # @tags = Tag.where(user_id: current_user.id)
    @tags = current_user.tags
    # render json: @tags
    render :index
  end

  def new
    @tag = Tag.new
    render json: @tag
  end

  def show
    @tag = Tag.find(params[:id])
    # render json: @tag
    render :show
  end

  def destroy
    if params[:tagging_id] && params[:relat]
      # notes_tag = NotesTag.find_by(note_id: params[:note_id],
      #   tag_id: params[:tag_id])
      # tag = Tag.find(params[:tag_id])
      tagging = Tagging.find(params[:tagging_id])
      @note = Note.find(tagging.note_id)
      @tag = Tag.find(tagging.tag_id)
      tagging.destroy!
      # render json: { note: note,
      #   tag: tag
      # }
      render "api/tags/tags_and_notes"
      # notes_tag = tag.notes_tags.find_by(note_id: params[:note_id])
    else
      @tag = Tag.find(params[:id])
      id = @tag.id
      @tag.destroy!
      render json: id
    end

  end

  def add_note_to_tag(tag)
    note = Note.find(params["note_id"])
    @tag.notes << note
    @tag.save
  end

  def create
    # @tag = Tag.joins("JOIN notes_tags nt on nt. notes n on n.tag_id = tag.id JOIN notebooks nb on nb.id = n.notebook_id JOIN users u on  u.id = nb.user_id").where(title: tag_params[:title])
    # tag_id = Tag.where(title: tag_params[:title], user_id: current_user.id).id
    @tag = Tag.where(title: tag_params[:title], user_id: current_user.id).first
    @tag ||= Tag.new(tag_params)
    # if tag_id
    #   @tag = Tag.find(tag_id)
    # else
    #   @tag = Tag.new(tag_params)
    # end
    # p @tag

    if @tag.save
      note = Note.find(params["note_id"])
      @tag.notes << note
      @tag.save
      # render json: @tag
      render :show
    else
      render json: @tag.errors, status: 422
    end
  end

  def update
    @tag = Tag.find(params[:id])
    @tag.update_attributes!(tag_params)

    if @tag.save
      render json: @tag
    else
      render json: @tag.errors, status: 422
    end
  end

  private
  def tag_params
    params.require(:tag).permit(:title, :user_id)
  end
end
