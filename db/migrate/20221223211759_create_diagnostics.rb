class CreateDiagnostics < ActiveRecord::Migration[6.1]
  def change
    create_table :diagnostics do |t|
      t.string :name
      t.datetime :performed_at
      t.integer :pulse
      t.decimal :sugar
      t.decimal :temperature
      t.decimal :pressure
      t.integer :doctor_id, null: false, foreign_key: true
      t.integer :patient_id, null: false, foreign_key: true
      t.integer :disease_id, null: false, foreign_key: true

      t.timestamps
    end
  end
end
