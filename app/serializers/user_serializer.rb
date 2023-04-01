class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :role, :image
end
