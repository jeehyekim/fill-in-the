class Quiz < ActiveRecord::Base
	# serialize :keywords, Array
	belongs_to :users
end
