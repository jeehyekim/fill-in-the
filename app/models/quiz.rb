class Quiz < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged
	belongs_to :user
	has_many :enrichments, dependent: :destroy

	validates :content, presence: true
	validates :title, presence: true
	validates :keyword, presence: true
end
