class Quiz < ActiveRecord::Base
	belongs_to :user
	has_many :enrichments, dependent: :destroy
	has_many :users, through: :enrichments

	validates :content, presence: true
	validates :title, presence: true
	validates :keyword, presence: true
end
