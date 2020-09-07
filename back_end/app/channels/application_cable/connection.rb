module ApplicationCable
  class Connection < ActionCable::Connection::Base
    require "jwt"
    identified_by :current_user
    def connect
      self.current_user= find_verified_user
    end
    private
    SECRET_KEY = Rails.application.secrets.secret_key_base
    def decode(encoded_token)
      decoded_jwt = JWT.decode(encoded_token, SECRET_KEY, true, algorithm: 'HS256')
      decoded_jwt.first
    end
    def find_verified_user
      if request.headers['Authorization'].blank?
        raise UnableAuthorizationError.new('認証情報が不足')
      end
      token = request.headers['Authorization'].split('Bearer,').last
      decode_payload= decode(token)
      current_user = User.find_by(id: decode_payload["user_id"])

    end
  end
end
