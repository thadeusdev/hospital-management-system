class Medicine < ApplicationRecord
 belongs_to :disease
 has_many :prescriptions
#  has_one_attached :img

 def img_url
    Rails.application.routes.url_helpers.url_for(img) if img.attached?
  end
end