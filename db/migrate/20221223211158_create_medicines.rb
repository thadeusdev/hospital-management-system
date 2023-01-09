class CreateMedicines < ActiveRecord::Migration[6.1]
  def change
    create_table :medicines do |t|
      t.string :image
      t.string :name 
      t.string :dosage
      t.references :patient, foreign_key: true
      t.string :description
      t.string :category
      t.boolean :is_acidic
      t.boolean :infant_safe

      t.timestamps
    end
  end
end
