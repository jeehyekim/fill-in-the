class AddKeywordToQuizzes < ActiveRecord::Migration
  def change
    add_column :quizzes, :keyword, :string
  end
end
