defmodule IGunYou.Repo.Migrations.CreateGameplay do
  use Ecto.Migration

  def change do
    create table(:gameplays) do
      add :completed, :boolean, default: false

      timestamps
    end

  end
end
