#rikuiwasaki
module Api
  module V1
    class HelloController < ApplicationController
      def index

        render json: {status:'SUCCESS'}

      end
      def show
        render json: {status:'SUCCESS'}
      end
    end
  end
end

#rikuiwasaki