class Quiz < ActiveRecord::Base
  belongs_to :creator, :class_name => "User"
  has_many :enrichments, :foreign_key => :tested_quiz_id
  has_many :testers, :through => :enrichments, :source => :quiz_tester

	validates :content, presence: true
	validates :title, presence: true
	validates :keyword, presence: true

end
