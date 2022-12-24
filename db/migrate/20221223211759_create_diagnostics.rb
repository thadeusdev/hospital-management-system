class CreateDiagnostics < ActiveRecord::Migration[6.1]
  def change
    create_table :diagnostics do |t|
      t.string :notes
      t.integer :disease_id
      t.integer :patient_id
      t.datetime :diagnosed_on
      t.integer :pulse
      t.decimal :sugar
      t.decimal :temperature
      t.decimal :pressure

      t.timestamps
    end
  end
end
