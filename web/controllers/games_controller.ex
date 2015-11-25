defmodule IGunYou.GamesController do
  use IGunYou.Web, :controller
  alias IGunYou.Game

  def index(conn, _params) do
    game_changeset = %Game{} |> Game.changeset
    render conn, "index.html", game_changeset: game_changeset
  end

  def create(conn, params) do
    game = Game.new(params)
    {:ok, game} = Repo.insert game

    redirect conn, to: "/games/#{game.slug}"
  end

  def show(conn, params) do
    game = Repo.one(from g in Game, where: g.slug == ^params["id"] , select: g)
    render conn, "show.html", game: game
  end
end
