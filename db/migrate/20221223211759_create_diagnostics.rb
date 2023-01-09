class CreateDiagnostics < ActiveRecord::Migration[6.1]
  def change
    create_table :diagnostics do |t|
      t.string :name
      t.references :patient, foreign_key: true
      t.references :doctor, foreign_key: true
      t.references :disease, foreign_key: true
      t.datetime :performed_at
      t.integer :pulse
      t.decimal :sugar
      t.decimal :temperature
      t.decimal :pressure

      t.timestamps
    end
  end
end
