class PatientSerializer < ActiveModel::Serializer
  attributes :id, :img, :full_name, :address, :visiting_date, :visit_no
end
