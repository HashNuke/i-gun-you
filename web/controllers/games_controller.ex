defmodule IGunYou.GamesController do
  use IGunYou.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def show(conn, %{"slug" => game_slug} = params) do
    render conn, "show.html", game_slug: game_slug
  end
end
