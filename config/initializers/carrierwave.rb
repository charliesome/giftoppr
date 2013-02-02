# Usually the default timeout for writing to S3 via fog is 60 seconds. As we
# have some large files it might actually take longer, resulting in
# Excon::Errors::Timeout errors being raised.
#
# Here we increase the default to be 10 minutes.
Excon.defaults = Excon.defaults.merge(:write_timeout => 10.minutes.to_i)

CarrierWave.configure do |config|
  if Rails.env.production?
    config.root      = Rails.root.join('tmp')
    config.cache_dir = 'carrierwave'
    config.storage   = :fog

    config.fog_credentials = {
      :provider               => 'AWS',
      :aws_access_key_id      => ENV['S3_KEY_ID'],
      :aws_secret_access_key  => ENV['S3_SECRET_KEY'],
      :persistent             => false # This is required to prevent write timeouts from PUT requests to S3
    }

    config.fog_directory  = ENV['S3_BUCKET']
    config.fog_public     = true
    config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}
    config.asset_host     = ENV['S3_HOST']
  else
    config.storage = :file
  end
end