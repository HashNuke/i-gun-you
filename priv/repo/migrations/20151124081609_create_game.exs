defmodule IGunYou.Repo.Migrations.CreateGame do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :slug, :text

      timestamps
    end

  end
end
