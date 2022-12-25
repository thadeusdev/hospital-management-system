class OnePatientSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :address, :visiting_date, :visit_no, :diseases
  has_many :diseases
end
