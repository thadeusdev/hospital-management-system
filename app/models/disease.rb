class Disease < ApplicationRecord
    has_many :diagnostics
    has_many :patients, through: :diagnostics
end
