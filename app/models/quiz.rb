class Quiz < ActiveRecord::Base
	# serialize :keywords, Array
	belongs_to :users


	validates :content, presence: true
	validates :title, presence: true
	validates :keyword, presence: true

end
