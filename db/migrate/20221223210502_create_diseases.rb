class CreateDiseases < ActiveRecord::Migration[6.1]
  def change
    create_table :diseases do |t|
      t.string :name
      t.references :patient, foreign_key: true
      t.string :symptoms
      t.string :severity

      t.timestamps
    end
  end
end
