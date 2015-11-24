class EnrichmentsController < ApplicationController
	def new
		@enrichment = Enrichment.new
	end

	def create
		@enrichment = Enrichment.create(:user_id => params[:user_id], :quiz_id => params[:quiz_id])
		if @enrichment.save
			p @enrichment
			if request.xhr?
				render :json => {
					:enrichment => @enrichment
				}
			end
			else 
			redirect_to quiz_path
		end
	end

	# def edit
	# 	@quiz = Quiz.find(params[:id])
	# 	@user = User.find(params[:id])
	# 	@enrichment = Enrichment.where(user_id: @user.id && quiz_id: @quiz.id)
	# end

	def update
		@enrichment = Enrichment.find(params[:id])
		@enrichment.complete = true
		@enrichment.save
		render :json => {
			:redirect => user_path(current_user)
		}
	end

end
