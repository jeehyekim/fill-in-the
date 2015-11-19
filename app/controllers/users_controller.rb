class UsersController < ApplicationController

  def index
    @users = User.all
    render :index
  end

  def new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      redirect_to @user
    else
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end


private
  def user_params
    user_params = params.require(:user).permit(:first_name, :last_name, :username, :email, :password)
  end

end
