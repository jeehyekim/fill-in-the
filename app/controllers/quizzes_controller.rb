class QuizzesController < ApplicationController

	def index
		@quiz = Quiz.all
	end

	def new
		@quiz = Quiz.new
		render :new
	end

	def create

		@quiz = Quiz.create(quiz_params)
		@quiz.user_id = current_user.id
		# p quiz_params
		# p "quiz params content is: "
		# p quiz_params["content"]
		
		if @quiz.save
			redirect_to quiz_path(@quiz)
		else
			render :new
		end
	end

	def show
		@quiz = Quiz.find(params[:id])
		render :show
	end

  def edit
    @quiz = Quiz.find(params[:id])
    @quiz.user_id = current_user.id
  end

  def update
    @quiz = Quiz.find(params[:id])
    @quiz.user_id = current_user.id
    @quiz.update_attributes(quiz_params)
    # @quiz.destroy!
    # @quiz =  Quiz.create(quiz_params)
    redirect_to quiz_path(@quiz)
  end

  def destroy 
    @quiz = Quiz.find(params[:id])
    @quiz.user_id = current_user.id
    @quiz.destroy!
    redirect_to user_path(@quiz.user_id)
  end

	private

	def quiz_params
		quiz_params = params.require(:quiz).permit(:title, :content, :keyword)
	end

end
