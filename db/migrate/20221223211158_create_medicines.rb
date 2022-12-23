class CreateMedicines < ActiveRecord::Migration[6.1]
  def change
    create_table :medicines do |t|
      t.string :name
      t.integer :patient_id
      t.string :disease_id

      t.timestamps
    end
  end
end
