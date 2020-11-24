defmodule LiveReactDemo.Repo do
  use Ecto.Repo,
    otp_app: :live_react_demo,
    adapter: Ecto.Adapters.Postgres
end
