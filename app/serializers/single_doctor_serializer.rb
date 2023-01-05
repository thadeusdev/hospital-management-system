class SingleDoctorSerializer < ActiveModel::Serializer
  attributes :id, :img, :full_name, :primary_practice, :secondary_practice, :patients
  belongs_to :patients
end
