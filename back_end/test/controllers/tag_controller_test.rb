require 'test_helper'

class TagControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get tag_index_url
    assert_response :success
  end

  test "should get create" do
    get tag_create_url
    assert_response :success
  end

  test "should get destroy" do
    get tag_destroy_url
    assert_response :success
  end

end
