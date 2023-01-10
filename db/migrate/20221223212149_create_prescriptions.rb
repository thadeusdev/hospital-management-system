class CreatePrescriptions < ActiveRecord::Migration[6.1]
  def change
    create_table :prescriptions do |t|
      t.string :frequency
      t.string :duration
      t.belongs_to :medicine, null: false, foreign_key: true
      t.belongs_to :disease, null: false, foreign_key: true
      t.belongs_to :doctor, null: false, foreign_key: true
      t.belongs_to :patient, null: false, foreign_key: true

      t.timestamps
    end
  end
end
