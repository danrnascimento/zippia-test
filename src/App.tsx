import axios from "axios";
import { useMemo, useState } from "react";

function App() {
  const [users, setUsers] = useState<Array<{ id: ""; name: "" }>>([]);
  const [nameQuery, setNameQuery] = useState<string>("");

  const handleClick = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((result) => {
        setUsers(result.data);
        console.log(result.data);
      })
      .catch(() => setUsers([]));
  };

  const filteredValues = useMemo(() => {
    return nameQuery
      ? users.filter((user) => user.name.includes(nameQuery))
      : users;
  }, [users, nameQuery]);

  return (
    <div>
      <h1>Zippia test</h1>
      <div>
        <button onClick={handleClick}>Get Users</button>
        <form action="">
          <label>
            Search for user:
            <input
              type="search"
              name="name"
              onChange={(event) => setNameQuery(event.target.value)}
            />
          </label>
        </form>
        <ul>
          {filteredValues.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
