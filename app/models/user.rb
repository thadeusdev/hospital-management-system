class User < ApplicationRecord
    has_secure_password

    PASSWORD_REQ = /\A
        (?=.{8,}) # Minimum 8 characters
        (?=.*\d) # Contains at least one number
        (?=.*[a-z]) # Contains at least one lowercase letter
        (?=.*[A-Z]) # Contains at least one uppercase letter
        (?=.*[[:^alnum:]]) # Contains at least one symbol
    /x

    validates :username, presence: true, uniqueness: true
    validates :username, length: {minimum: 5}
    validates :password, format: PASSWORD_REQ
    validates :password_confirmation, presence: true
end
