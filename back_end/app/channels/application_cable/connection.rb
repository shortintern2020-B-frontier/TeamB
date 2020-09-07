module ApplicationCable
  class Connection < ActionCable::Connection::Base
    include JwtAuthenticator
    jwt_authenticate 
    identified_by :current_user
    def connect
      self.current_user = @current_user
    end
    


  end
end
