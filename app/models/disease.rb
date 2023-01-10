class Disease < ApplicationRecord
    has_many :diagnostics, dependent: :destroy
    has_many :patients, through: :diagnostics
    has_many :prescriptions
end
