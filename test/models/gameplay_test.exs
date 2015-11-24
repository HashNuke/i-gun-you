defmodule IGunYou.GameplayTest do
  use IGunYou.ModelCase

  alias IGunYou.Gameplay

  @valid_attrs %{completed: true}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Gameplay.changeset(%Gameplay{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Gameplay.changeset(%Gameplay{}, @invalid_attrs)
    refute changeset.valid?
  end
end
