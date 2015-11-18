class User < ActiveRecord::Base

  has_secure_password

  validates :email, presence: true, uniqueness: true, length: {minimum: 6}, format: { with: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i}
  validates :password, presence: true, length: {minimum: 3}
  validates :username, presence: true

end
