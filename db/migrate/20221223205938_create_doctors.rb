class CreateDoctors < ActiveRecord::Migration[6.1]
  def change
    create_table :doctors do |t|
      t.string :img
      t.string :full_name
      t.string :primary_practice
      t.string :secondary_practice

      t.timestamps
    end
  end
end
