import { Dispatch, useCallback, useMemo, useState } from "react";
import { User } from "../domain/User";
import fetchUsers from "../services/user";

type UseUsersReturn = [
  User[],
  {
    getUsers: () => void;
    filerUserByName: Dispatch<React.SetStateAction<string>>;
  }
];

export default function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [nameQuery, setNameQuery] = useState<string>("");

  const getUsers = useCallback(() => {
    fetchUsers().then(setUsers);
  }, []);

  const filteredUsers = useMemo(() => {
    return nameQuery
      ? users.filter((user) =>
          user.name.toLowerCase().includes(nameQuery.toLowerCase())
        )
      : users;
  }, [users, nameQuery]);

  return [filteredUsers, { getUsers, filerUserByName: setNameQuery }];
}
