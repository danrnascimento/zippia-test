import UsersTable from "./components/UsersTable";
import useUsers from "./hooks/users";

function App() {
  const [users, { getUsers, filerUserByName }] = useUsers();

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
        <UsersTable users={users} />
      </div>
    </div>
  );
}

export default App;
