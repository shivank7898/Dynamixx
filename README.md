# Dynamixx Store (Beta)

> 🧪 Currently in testing phase - A minimal experiment in zero-boilerplate state management for React.

An experimental package that lets you add and manage state dynamically with zero configuration. Built on top of Zustand.

## Features

- 🚀 **Zero Boilerplate**: Just import and start using - no setup needed
- 💾 **Auto-Persistence**: State automatically persists in localStorage
- 🔄 **Dynamic State**: Add or remove state as you need it
- 🎯 **TypeScript Ready**: Full type support included

## Installation

```bash
npm install dynamixx
# or
yarn add dynamixx
```

## Usage Examples

### 1. Dynamic Store (Zero Boilerplate)

Perfect for rapid development and dynamic data needs.

```typescript
import { useDynamicStore } from "dynamixx";

// --- Authentication & User Management ---
function AuthComponent() {
  const { addState, removeState, updateState } = useDynamicStore();

  // Add user data after login
  const handleLogin = async (credentials) => {
    const userData = await loginAPI(credentials);
    addState("user", userData);
    addState("isAuthenticated", true);
  };

  // Clean up on logout
  const handleLogout = () => {
    removeState("user");
    removeState("isAuthenticated");
  };

  // Update user preferences
  const updatePreferences = (newPrefs) => {
    const { user } = useDynamicStore();
    updateState("user", {
      ...user,
      preferences: { ...user.preferences, ...newPrefs },
    });
  };
}

// --- Shopping Cart Management ---
function CartComponent() {
  const { addState, updateState } = useDynamicStore();

  // Initialize cart
  useEffect(() => {
    addState("cart", { items: [], total: 0 });
  }, []);

  // Use cart state
  const { cart } = useDynamicStore();

  const addToCart = (product) => {
    updateState("cart", {
      items: [...cart.items, product],
      total: cart.total + product.price,
    });
  };
}

// --- Theme Management ---
function ThemeComponent() {
  const { addState, updateState } = useDynamicStore();

  // Initialize theme
  useEffect(() => {
    addState("theme", {
      mode: "light",
      colors: {
        primary: "#007bff",
        secondary: "#6c757d",
      },
    });
  }, []);

  // Use theme state
  const { theme } = useDynamicStore();

  const toggleTheme = () => {
    updateState("theme", {
      ...theme,
      mode: theme.mode === "light" ? "dark" : "light",
    });
  };
}
```

### 2. Custom Store (Traditional Zustand Style)

For cases where you prefer a more structured approach with TypeScript.

```typescript
import { createStore } from "dynamixx";

// Define your store types
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  filter: "all" | "active" | "completed";
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  setFilter: (filter: "all" | "active" | "completed") => void;
  filteredTodos: () => Todo[];
}

// Create a typed store with persistence
const useTodoStore = createStore<TodoStore>({
  name: "todo-store",
  initialState: {
    todos: [],
    filter: "all",

    // Actions
    addTodo: (text: string) => {
      const todo: Todo = {
        id: Date.now(),
        text,
        completed: false,
      };
      useTodoStore.setState((state) => ({
        todos: [...state.todos, todo],
      }));
    },

    toggleTodo: (id: number) => {
      useTodoStore.setState((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      }));
    },

    setFilter: (filter: "all" | "active" | "completed") => {
      useTodoStore.setState({ filter });
    },

    // Computed value
    filteredTodos: () => {
      const state = useTodoStore.getState();
      switch (state.filter) {
        case "active":
          return state.todos.filter((todo) => !todo.completed);
        case "completed":
          return state.todos.filter((todo) => todo.completed);
        default:
          return state.todos;
      }
    },
  },
});

// Use in components
function TodoApp() {
  const { todos, addTodo, toggleTodo, filter, setFilter, filteredTodos } =
    useTodoStore();

  return (
    <div>
      <input
        type="text"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            addTodo(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
        placeholder="Add todo"
      />

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <ul>
        {filteredTodos().map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## API Reference

### Dynamic Store (Beta Feature)

```typescript
const {
  addState, // Add any state: addState(key, value)
  updateState, // Update state: updateState(key, newValue)
  removeState, // Remove state: removeState(key)
  getState, // Get state: getState(key)
  resetState, // Reset all state
} = useDynamicStore();
```

### Custom Store

```typescript
const useStore = createStore<T>({
  name: string, // Store name for persistence
  initialState: T, // Initial state and methods
});
```

## Current Limitations (Beta)

- 🧪 This is an experimental package
- 📦 All state is persisted to localStorage
- 🔄 No custom persistence options yet
- ⚠️ May have unexpected behaviors with complex nested state

## Contributing

This is an experimental project and we welcome feedback and contributions! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests
- Share use cases

## License

MIT
