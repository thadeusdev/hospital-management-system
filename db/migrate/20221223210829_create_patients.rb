class CreatePatients < ActiveRecord::Migration[6.1]
  def change
    create_table :patients do |t|
      t.string :img
      t.string :full_name
      t.string :address
      t.datetime :visiting_date
      t.string :visit_no

      t.timestamps
    end
  end
end
