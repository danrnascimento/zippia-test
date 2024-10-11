import { User } from "../../domain/User";

type UsersTableProps = {
  users: User[];
  onSortClick?: (field: string) => void;
  currentSort?: string;
};

export default function UsersTable({
  users,
  onSortClick,
  currentSort,
}: UsersTableProps) {
  const createTHClickHandler = (field: string) => () => {
    console.log({ currentSort, field });
    onSortClick?.(currentSort === field ? "" : field);
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={createTHClickHandler("name")}>Name</th>
          <th onClick={createTHClickHandler("username")}>Username</th>
          <th onClick={createTHClickHandler("email")}>Email</th>
          <th onClick={createTHClickHandler("phone")}>Phone</th>
          <th onClick={createTHClickHandler("city")}>City</th>
          <th onClick={createTHClickHandler("company")}>Company</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.address.city}</td>
            <td>{user.company.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
