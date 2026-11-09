class CreateDiseases < ActiveRecord::Migration[6.1]
  def change
    create_table :diseases do |t|
      t.string :name
      t.string :symptoms
      t.string :severity
      t.integer :patient_id, null: false, foreign_key: true

      t.timestamps
    end
  end
end
