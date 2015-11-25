defmodule IGunYou.GamesController do
  use IGunYou.Web, :controller

  def index(conn, _params) do
    game = %IGunYou.Game{}
    render conn, "index.html", game: game
  end

  def show(conn, %{"slug" => game_slug} = params) do
    render conn, "show.html", game_slug: game_slug
  end
end
