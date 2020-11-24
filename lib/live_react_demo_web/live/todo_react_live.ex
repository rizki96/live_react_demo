defmodule LiveReactDemoWeb.TodoReactLive do
  use LiveReactDemoWeb, :live_view

  import PhoenixLiveReact

  alias LiveReactDemo.Tasks
  alias LiveReactDemo.Tasks.Todo

  require Logger

  @topic "todo_react_live"

  @impl true
  def render(assigns) do
    ~L"""
    <%= live_react_component("AppComponents.Todo", %{name: @name, todos: @todos}, id: "todo-react-1", merge_props: true) %>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    if connected?(socket) do
      Phoenix.PubSub.subscribe(LiveReactDemo.PubSub, @topic, link: true)
    end

    name = "LiveView React Demo"
    todos = Tasks.list_todos()
    socket =
    socket
    |> assign(name: name)
    |> assign(todos: todos)

    {:ok, assign(socket, temporary_assigns: [todos: []])}
  end

  @impl true
  def handle_event("add_todo", %{"title" => title} = _params, socket) do
    Logger.log(:debug, "add_todo: #{inspect title}")
    socket =
    case Tasks.create_todo(%{"title" => title, "is_completed" => false}) do
      {:ok, todo} ->
        Phoenix.PubSub.broadcast(LiveReactDemo.PubSub, @topic, {"new_todo_event", todo})
        socket
      {:error, changeset} ->
        push_event(socket, "add_todo_result", %{errors: changeset.errors})
      end
    {:noreply, socket}
  end

  @impl true
  def handle_event("validate_todo", %{"title" => title} = _params, socket) do
    #Logger.log(:debug, "validate_todo: #{inspect title}")
    changeset =
      %Todo{}
      |> Tasks.change_todo(%{"title" => title, "is_completed" => false})
      |> Map.put(:action, :insert)

    #Logger.log(:debug, "#{inspect changeset.errors}")

    {:noreply, push_event(socket, "validate_todo_result", %{errors: changeset.errors})}
  end

  @impl true
  def handle_info({"new_todo_event", todo} = _info, socket) do

      {:noreply, push_event(socket, "add_todo_result", %{todo: todo})}
  end

  @impl true
  def handle_info(_info, socket) do
      # all unhandled info goes here
      {:noreply, socket}
  end

end
