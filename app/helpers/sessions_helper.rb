module SessionsHelper

  def login(user)
    session[:user_id] = user.id
    @current_user = user
  end

  def current_user
    @current_user ||= session[:user_id] && User.find(session[:user_id])
    #current user is assigned already or if session with user_id if there, find the user with user_id
  end

  def logged_in?
    if current_user == nil
      redirect_to new_seesion_path
    end
  end

  def logout 
    @current_user = session[:user_id] = nil
  end

end
