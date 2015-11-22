class Enrichment < ActiveRecord::Base
  belongs_to :user_creator
  belongs_to :quiz
end
