class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    @current_user ||= session[:user_id] && User.find(session[:user_id])
    #current user is assigned already or if session with user_id if there, find the user with user_id
  end

  helper_method :current_user


  include SessionsHelper

end
