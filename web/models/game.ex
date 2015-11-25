defmodule IGunYou.Game do
  use IGunYou.Web, :model
  alias Ecto.Changeset

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
    game_params = Map.merge(params, %{slug: unique_slug})
    %IGunYou.Game{}
    |> Changeset.change(game_params)
  end


  defp unique_slug do
    slug = :erlang.now()
    |> :erlang.term_to_binary()
    |> :erlang.md5()
    |> :erlang.bitstring_to_list()
    |> Enum.map(fn(n)-> :io_lib.format("~2.16.0b", [n]) end)
    |> :lists.flatten

    "#{slug}"
  end
end
