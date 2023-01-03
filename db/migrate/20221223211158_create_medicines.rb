class CreateMedicines < ActiveRecord::Migration[6.1]
  def change
    create_table :medicines do |t|
      t.string :name
      t.string :description
      t.string :category
      t.boolean :is_acidic
      t.boolean :infant_safe
      t.integer :patient_id
      t.integer :disease_id

      t.timestamps
    end
  end
end
