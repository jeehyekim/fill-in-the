class Enrichment < ActiveRecord::Base
  belongs_to :quiz_test, :class_name => "User"
  belongs_to :tested_quiz, :class_name => "Quiz"
end
