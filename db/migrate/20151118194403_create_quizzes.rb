class CreateQuizzes < ActiveRecord::Migration
  def change
    create_table :quizzes do |t|
      t.string :title
      t.text :content
      t.text :keyword, array: true, default: []

      t.timestamps null: false
    end
  end
end
