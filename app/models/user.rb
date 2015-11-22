class User < ActiveRecord::Base
  has_many :created_quizzes, :foreign_key => "creator_id", :class_name => "Quiz"
  has_many :enrichments, :foreign_key => :quiz_test_id
  has_many :tested_quizzes, :through => :enrichments

  has_secure_password

  # @user.authenticate("password") => user || false

  validates :email, presence: true, uniqueness: true, length: {minimum: 6}, format: { with: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i}
  validates :username, presence: true

  has_attached_file :image, styles: { thumb: "150x150#" }, :default_url => "missing.png"
 
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

end
 