Rails.application.routes.draw do
  root 'sketches#index'
  resources :sketches, :except => :new, :edit
end
