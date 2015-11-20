class QuizzesController < ApplicationController

	def new
		@quiz = Quiz.new
		render :new
	end

	def create
		@quiz = current_user.quizzes.create(quiz_params)
		
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

	private

	def quiz_params
		quiz_params = params.require(:quiz).permit(:title, :content, :keyword)
	end

end
