import { PropsWithChildren, useState } from "react";
import { User } from "../../domain/User";
import Modal from "../Modal";
import style from "./style.module.scss";
import UserModalContent from "../UserModalContent";

type UsersTableProps = {
  users: User[];
  onSortClick?: (field: string) => void;
  currentSort?: string;
};

type TableHeaderProps = PropsWithChildren<{
  field: string;
  onClick: (field: string) => void;
  active?: boolean;
}>;
function TableHeader({ field, onClick, active, children }: TableHeaderProps) {
  return (
    <th onClick={() => onClick(field)}>
      {children} {active ? "⬇️" : ""}
    </th>
  );
}

export default function UsersTable({
  users,
  onSortClick,
  currentSort,
}: UsersTableProps) {
  const [selectedUser, selectUser] = useState<User | undefined>();

  const createTHClickHandler = (field: string) => {
    onSortClick?.(currentSort === field ? "" : field);
  };

  return (
    <>
      <table className={style.container}>
        <thead>
          <tr>
            <TableHeader
              field="name"
              onClick={createTHClickHandler}
              active={currentSort === "name"}
            >
              Name
            </TableHeader>
            <TableHeader
              field="username"
              onClick={createTHClickHandler}
              active={currentSort === "username"}
            >
              Username
            </TableHeader>
            <TableHeader
              field="email"
              onClick={createTHClickHandler}
              active={currentSort === "email"}
            >
              Email
            </TableHeader>
            <TableHeader
              field="phone"
              onClick={createTHClickHandler}
              active={currentSort === "phone"}
            >
              Phone
            </TableHeader>
            <TableHeader
              field="city"
              onClick={createTHClickHandler}
              active={currentSort === "city"}
            >
              City
            </TableHeader>
            <TableHeader
              field="company"
              onClick={createTHClickHandler}
              active={currentSort === "company"}
            >
              Company
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            users.map((user) => (
              <tr key={user.id} onClick={() => selectUser(user)}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address.city}</td>
                <td>{user.company.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className={style.emptyCell} colSpan={6}>
                No elements found 😞
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal open={!!selectedUser} onClose={() => selectUser(undefined)}>
        <UserModalContent user={selectedUser!} />
      </Modal>
    </>
  );
}
