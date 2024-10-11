import UsersTable from "./components/UsersTable";
import useUsers from "./hooks/users";

function App() {
  const [users, { getUsers, filerUserByName, error }] = useUsers();

  return (
    <div>
      <h1>Zippia test</h1>
      <div>
        <button onClick={getUsers}>Get Users</button>
        <form action="">
          <label>
            Search for user:
            <input
              type="search"
              name="name"
              onChange={(event) => filerUserByName(event.target.value)}
            />
          </label>
        </form>
        {!error ? <UsersTable users={users} /> : "Failed"}
      </div>
    </div>
  );
}

export default App;
