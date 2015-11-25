defmodule IGunYou.Game do
  use IGunYou.Web, :model

  schema "games" do
    field :slug, :string
    field :private, :boolean

    timestamps
  end

  @required_fields ~w(slug)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end


  def new(params) do
    game_params = Map.merge params, %{slug: Ecto.UUID.generate}

    Ecto.Changeset.change(%IGunYou.Game{}, game_params)
  end

end
