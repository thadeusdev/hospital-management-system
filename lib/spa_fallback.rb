class SpaFallback
  def initialize(app)
    @app = app
    @index_path = Rails.root.join("public", "index.html")
  end

  def call(env)
    path = env.fetch("PATH_INFO")

    if env["REQUEST_METHOD"] == "GET" &&
       path != "/up" &&
       File.extname(path).empty? &&
       env["HTTP_ACCEPT"].to_s.include?("text/html")
      [
        200,
        { "Content-Type" => "text/html; charset=utf-8", "Cache-Control" => "no-cache" },
        [File.read(@index_path)]
      ]
    else
      @app.call(env)
    end
  end
end
