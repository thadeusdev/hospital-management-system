class DoctorSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :primary_practice, :secondary_practice
end
