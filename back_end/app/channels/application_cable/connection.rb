module ApplicationCable
  class Connection < ActionCable::Connection::Base
    require "jwt"
    identified_by :current_user
    def connect
      self.current_user= find_verified_user
    end
    private
    SECRET_KEY = Rails.application.secrets.secret_key_base

    def find_verified_user
      if request.headers['Authorization'].blank?
        raise UnableAuthorizationError.new('認証情報が不足')
      end
      token = request.headers['Authorization'].split('Bearer ').last
      payload=JWT.decode(token, SECRET_KEY, true, {algorithm: 'HS256'})
      current_user = User.find_by(id: payload[0]["user_id"])
      if current_user.nil?
      else
        current_user
      end

    end
  end
end
