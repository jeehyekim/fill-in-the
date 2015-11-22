class Quiz < ActiveRecord::Base
  has_many :enrichments
  has_many :users, through: :enrichments

	validates :content, presence: true
	validates :title, presence: true
	validates :keyword, presence: true

end
