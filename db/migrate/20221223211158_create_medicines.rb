class CreateMedicines < ActiveRecord::Migration[6.1]
  def change
    create_table :medicines do |t|
      t.string :image
      t.string :name 
      t.string :dosage
      t.string :description
      t.string :category
      t.boolean :is_acidic
      t.boolean :infant_safe
      t.belongs_to :patient, null: false, foreign_key: true

      t.timestamps
    end
  end
end
