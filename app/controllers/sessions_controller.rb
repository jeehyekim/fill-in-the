class SessionsController < ApplicationController

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.create(user_params)
    login(@user)
    redirect_to @user
  end

  private
  def user_params
    user_params = params.require(:user).permit(:first_name, :last_name, :username, :email, :password)
  end

end
