'''
  author: Hiranuma Tomoyuki
  Date: 20200904
'''

module JwtAuthenticator
  require "jwt"

  SECRET_KEY = Rails.application.secrets.secret_key_base

  def jwt_authenticate
    if request.headers['Authorization'].blank?
      raise UnableAuthorizationError.new('認証情報が不足')
    end

    encoded_token = request.headers['Authorization'].split('Bearer ').last
    payload = decode(encoded_token)
    @current_user = User.find_by(id: payload[:user_id])
    if @current_user.nil?
      raise UnableAuthorizationError.new('認証できません')
    end
    @current_user
  end

  def encode(user_id)
    expire_in = 1.hour.from_now.to_i
    preload = { user_id: user_id, exp: expire_in }
    JWT.encode(preload, SECRET_KEY, 'HS256')
  end

  def decode(encoded_token)
    decoded_jwt = JWT.decode(encoded_token, SECRET_KEY, true, algorithm: 'HS256')
    decoded_jwt.first
  end
end