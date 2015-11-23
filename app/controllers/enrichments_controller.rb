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

end
