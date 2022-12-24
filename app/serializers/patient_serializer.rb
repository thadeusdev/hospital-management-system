class PatientSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :address, :visiting_date, :visit_no
end
