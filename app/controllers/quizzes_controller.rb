class QuizzesController < ApplicationController

	def new
		@quiz = Quiz.new
		render :new
	end

	def create
		@quiz = Quiz.create(quiz_params)
			redirect_to quiz_path(@quiz)
	end

	def show
		@quiz = Quiz.find(params[:id])
		render :show
	end

	private
		def quiz_params
			quiz_params = params.require(:quiz).permit(:title, :content)
		end

end
