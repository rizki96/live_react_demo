defmodule LiveReactDemo.Tasks.Todo do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :title, :is_completed]}
  schema "todos" do
    field :is_completed, :boolean, default: false
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(todo, attrs) do
    todo
    |> cast(attrs, [:title, :is_completed])
    |> validate_required([:title, :is_completed])
    #|> validate_length(:title, [min: 6])
    |> simple_validate_length
  end

  defp simple_validate_length(%{changes: changes} = changeset) do
    if Map.has_key?(changes, :title) do
      title_len = 6
      if String.length(changes[:title]) < title_len do
        add_error(changeset, :title, "should at least #{title_len} character(s) length")
      else
        changeset
      end
    else
      changeset
    end
  end
end
