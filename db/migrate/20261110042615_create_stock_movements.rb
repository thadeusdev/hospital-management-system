class CreateStockMovements < ActiveRecord::Migration[6.1]
  def change
    create_table :stock_movements do |t|
      t.references :stock_batch, null: false, foreign_key: true
      t.string  :kind, null: false
      t.integer :quantity, null: false
      t.string  :reason
      t.references :user, null: true, foreign_key: true
      t.timestamps
    end
    add_index :stock_movements, [:stock_batch_id, :created_at]
  end
end