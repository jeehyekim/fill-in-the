class User < ActiveRecord::Base
  extend FriendlyId
  friendly_id :username, use: :slugged
	has_many :quizzes

  has_secure_password
  
  validates :email, presence: true, uniqueness: true, length: {minimum: 6}, format: { with: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i}
  validates :username, presence: true
  has_attached_file :image, styles: { thumb: "150x150#" }, :default_url => "missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

end
 