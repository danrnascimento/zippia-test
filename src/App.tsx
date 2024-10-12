import UsersTable from "./components/UsersTable";
import useUsers from "./hooks/users";
import style from "./App.module.scss";
import SearchBar from "./components/Search";

function App() {
  const [
    users,
    { getUsers, filerUsersByName, sortUserByName, sortField, error },
  ] = useUsers();

  return (
    <div className={style.container}>
      <h1 className={style.title}>Zippia test</h1>

      <div>
        <div className={style.toolbar}>
          <button className={style.fetchButton} onClick={getUsers}>
            Get Users
          </button>
          <SearchBar onChange={filerUsersByName} disabled={!users} />
        </div>

        {error ? (
          <div className={style.errorAlert}>{error.message}</div>
        ) : undefined}

        {users ? (
          <UsersTable
            users={users}
            onSortClick={sortUserByName}
            currentSort={sortField}
          />
        ) : (
          <div className={style.initialMessage}>
            Get users to start the application
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
