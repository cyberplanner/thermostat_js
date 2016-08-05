require "sinatra/base"
require "json"

class Server < Sinatra::Base
  set :public_folder, proc { File.join(root) }

  before do
    headers "Access-Control-Allow-Origin" => "*"
  end

  post '/local-temp' do
    content_type :json

    @@local_temp = params[:temp] if params[:temp]
    @@psm        = params[:psm]  if params[:psm]
    @@city       = params[:city] if params[:city]
    { status: "ok" }.to_json
  end

  get '/local-temp' do
    content_type :json

    { temp: @@local_temp.to_i, city: @@city, psm: @@psm }.to_json
  end

  run! if app_file == $0
end
