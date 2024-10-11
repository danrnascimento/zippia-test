import UsersTable from "./components/UsersTable";
import useUsers from "./hooks/users";

function App() {
  const [
    users,
    { getUsers, filerUsersByName, sortUserByName, error, sortField },
  ] = useUsers();

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
              onChange={(event) => filerUsersByName(event.target.value)}
            />
          </label>
        </form>

        {!error ? (
          users ? (
            <UsersTable
              users={users}
              onSortClick={sortUserByName}
              currentSort={sortField}
            />
          ) : (
            "not fetched"
          )
        ) : (
          "Failed"
        )}
      </div>
    </div>
  );
}

export default App;
