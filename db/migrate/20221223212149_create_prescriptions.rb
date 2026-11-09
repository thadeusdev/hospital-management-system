class CreatePrescriptions < ActiveRecord::Migration[6.1]
  def change
    create_table :prescriptions do |t|
      t.string :frequency
      t.string :duration
      t.integer :medicine_id, null: false, foreign_key: true
      t.integer :disease_id, null: false, foreign_key: true
      t.integer :doctor_id, null: false, foreign_key: true
      t.integer :patient_id, null: false, foreign_key: true

      t.timestamps
    end
  end
end
