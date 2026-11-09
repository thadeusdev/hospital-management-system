class CreateDoctors < ActiveRecord::Migration[6.1]
  def change
    create_table :doctors do |t|
      t.string :image
      t.string :full_name
      t.string :email
      t.string :primary_practice
      t.string :secondary_practice
      t.integer :years_of_experience
      # t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
