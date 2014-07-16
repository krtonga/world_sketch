class AddStoryColumnToSketchTable < ActiveRecord::Migration
  def change
    add_column :sketches, :story, :text
  end
end
