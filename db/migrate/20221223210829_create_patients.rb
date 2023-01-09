class CreatePatients < ActiveRecord::Migration[6.1]
  def change
    create_table :patients do |t|
      t.string :image
      t.string :full_name
      t.integer :age
      t.string :gender
      t.string :address
      t.date :visiting_date
      t.string :visit_no

      t.timestamps
    end
  end
end
