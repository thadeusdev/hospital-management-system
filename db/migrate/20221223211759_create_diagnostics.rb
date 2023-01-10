class CreateDiagnostics < ActiveRecord::Migration[6.1]
  def change
    create_table :diagnostics do |t|
      t.string :name
      t.datetime :performed_at
      t.integer :pulse
      t.decimal :sugar
      t.decimal :temperature
      t.decimal :pressure
      t.belongs_to :doctor, null: false, foreign_key: true
      t.belongs_to :patient, null: false, foreign_key: true
      t.belongs_to :disease, null: false, foreign_key: true

      t.timestamps
    end
  end
end
