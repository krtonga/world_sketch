require 'spec_helper'

describe SketchesController do
  describe 'given a sketch' do

    describe 'GET index' do
      before :each do
        get :index
      end
      it 'responds successfully' do
        expect(response.code).to eq('200')
      end
    end

    describe 'GET show' do
      before :each do
        get :show, :id =>

  end
end
