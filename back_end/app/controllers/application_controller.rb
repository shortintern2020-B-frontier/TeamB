class ApplicationController < ActionController::API
  include JwtAuthenticator
end
