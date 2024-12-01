import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TODOs | Next.js App",
  description: "A list of TODOs fetched dynamically from a public API using SSR.",
};

export default async function TodosPage() {
  // Dynamically fetch TODOs from a public API (replace the URL with your actual API endpoint)
  const apiUrl = "https://jsonplaceholder.typicode.com/todos";
  const response = await fetch(apiUrl, {
    cache: "no-store", // This ensures fresh data is fetched every time the page is loaded
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${apiUrl}`);
  }

  const todos = await response.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">TODOs List</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {todos.slice(0, 10).map((todo: any) => (
          <li
            key={todo.id}
            className={`p-4 rounded-lg shadow-md ${
              todo.completed ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <h2 className="font-semibold text-lg">{todo.title}</h2>
            <p
              className={`mt-2 text-sm ${
                todo.completed ? "text-green-700" : "text-red-700"
              }`}
            >
              {todo.completed ? "Completed" : "Pending"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
