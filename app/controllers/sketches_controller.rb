class SketchesController < ApplicationController

  def index
    @sketches = Sketch.all
    render json: @sketches.to_json
  end

  def create
    @sketch = Sketch.create(sketch_params)
    render json: @sketch.to_json
  end

  def show
    @sketch = Sketch.find(params[:id])
    render json: @sketch.to_json
  end

  def update
    @sketch = Sketch.find(params[:id])
    updated = Sketch.update(sketch_params)
    render json: @sketch.to_json
  end

  def destroy
    @sketch = Sketch.find(params[:id])
    @monkey.destroy
    render json: sketch.to_json
  end

  private
  def sketch_params
    params.require(:sketch).permit(:data, :artist, :location, :group, :created_at, :updated_at, :story)
  end

end
