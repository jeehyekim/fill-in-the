class Enrichment < ActiveRecord::Base
	belongs_to :quiz

  validates :user_id, :uniqueness => {:scope => :quiz_id, :message => 'user id must be unique per quiz'}
end
