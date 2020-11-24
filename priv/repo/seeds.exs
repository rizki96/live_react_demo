# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     LiveReactDemo.Repo.insert!(%LiveReactDemo.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

LiveReactDemo.Repo.insert!(%LiveReactDemo.Tasks.Todo{title: "this is todo 1", is_completed: false})
LiveReactDemo.Repo.insert!(%LiveReactDemo.Tasks.Todo{title: "this is todo 2", is_completed: false})
LiveReactDemo.Repo.insert!(%LiveReactDemo.Tasks.Todo{title: "this is todo 3", is_completed: false})
