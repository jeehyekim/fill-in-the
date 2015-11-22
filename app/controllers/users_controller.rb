class UsersController < ApplicationController

  def index
    @quizzes = Quiz.limit(8)
    @users = User.all
    render :index
  end

  def new
    @user = User.new
    render :new
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

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params_edit)
      redirect_to user_path(@user)
    else
      render :edit
    end
  end

private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :username, :email, :password)
  end

  def user_params_edit
    params.require(:user).permit(:first_name, :last_name, :email, :image)
  end

end
