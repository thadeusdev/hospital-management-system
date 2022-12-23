class CreatePrescriptions < ActiveRecord::Migration[6.1]
  def change
    create_table :prescriptions do |t|
      t.string :notes
      t.integer :medicine_id
      t.integer :patient_id

      t.timestamps
    end
  end
end
