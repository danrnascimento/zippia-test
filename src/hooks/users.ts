import { Dispatch, useCallback, useMemo, useState } from "react";
import { User } from "../domain/User";
import fetchUsers from "../services/user";

type UseUsersReturn = [
  User[],
  {
    error?: Error;
    getUsers: () => void;
    filerUserByName: Dispatch<React.SetStateAction<string>>;
  }
];

export default function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [nameQuery, setNameQuery] = useState<string>("");

  const getUsers = useCallback(async () => {
    const [result, fetchError] = await fetchUsers();
    setUsers(result || []);
    setError(fetchError);
  }, []);

  const filteredUsers = useMemo(() => {
    return nameQuery
      ? users.filter((user) =>
          user.name.toLowerCase().includes(nameQuery.toLowerCase())
        )
      : users;
  }, [users, nameQuery]);

  return [filteredUsers, { getUsers, filerUserByName: setNameQuery, error }];
}
