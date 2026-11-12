class CreateStockBatches < ActiveRecord::Migration[6.1]
  def change
    create_table :stock_batches do |t|
      t.references :medicine, null: false, foreign_key: true
      t.string  :batch_number, null: false
      t.date    :expiry_date,  null: false
      t.integer :quantity,     null: false, default: 0
      t.date    :received_at,  null: false
      t.timestamps
    end
    add_index :stock_batches, [:medicine_id, :batch_number], unique: true
    add_index :stock_batches, :expiry_date
  end
end