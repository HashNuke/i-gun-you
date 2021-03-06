defmodule IGunYou.Router do
  use IGunYou.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", IGunYou do
    pipe_through :browser # Use the default browser stack

    get "/", GamesController, :index
    resources "/g", GamesController, only: [:index, :create, :show]
  end

  # Other scopes may use custom stacks.
  # scope "/api", IGunYou do
  #   pipe_through :api
  # end
end
