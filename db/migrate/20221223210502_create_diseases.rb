class CreateDiseases < ActiveRecord::Migration[6.1]
  def change
    create_table :diseases do |t|
      t.string :name
      t.string :symptoms
      t.string :severity

      t.timestamps
    end
  end
end
