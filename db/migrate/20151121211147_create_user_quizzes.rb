class CreateUserQuizzes < ActiveRecord::Migration
  def change
    create_table :user_quizzes do |t|

      t.timestamps null: false

      # foreign keys for associated models
      t.belongs_to :user
      t.belongs_to :quiz
    end
  end
end
