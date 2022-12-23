class CreatePatients < ActiveRecord::Migration[6.1]
  def change
    create_table :patients do |t|
      t.string :name
      t.string :address
      t.date :visiting
      t.string :visit_no

      t.timestamps
    end
  end
end
