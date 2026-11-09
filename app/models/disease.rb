class Disease < ApplicationRecord
    validates :name, presence: true

    has_many :diagnostics
    has_many :patients, through: :diagnostics
end
