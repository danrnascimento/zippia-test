import { startTransition, useCallback, useMemo, useState } from "react";
import { User } from "../domain/User";
import fetchUsers from "../services/user";

type UseUsersReturn = [
  User[] | undefined,
  {
    error?: Error;
    sortField: string;
    getUsers: () => void;
    filerUsersByName: (value: string) => void;
    sortUserByName: (field: string) => void;
  }
];

const createFieldComparator =
  (sortField: string) => (userA: User, userB: User) => {
    if (!sortField) return 1;

    if (sortField === "city") {
      return userA.address.city < userB.address.city ? -1 : 1;
    }

    if (sortField === "company") {
      return userA.company.name < userB.company.name ? -1 : 1;
    }

    return userA[sortField as keyof User] < userB[sortField as keyof User]
      ? -1
      : 1;
  };

export default function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [nameQuery, setNameQuery] = useState<string>("");
  const [sortField, setSortField] = useState<string>("");

  const getUsers = useCallback(async () => {
    const [result, fetchError] = await fetchUsers();
    setUsers(result || []);
    setError(fetchError);
  }, []);

  const filteredUsers = useMemo(() => {
    return users
      ?.filter((user) => {
        if (!nameQuery) return true;
        return user.name.toLowerCase().includes(nameQuery.toLowerCase());
      })
      .sort(createFieldComparator(sortField));
  }, [users, nameQuery, sortField]);

  const filerUsersByName = useCallback((value: string) => {
    startTransition(() => {
      setNameQuery(value);
    });
  }, []);

  const sortUserByName = useCallback((field: string) => {
    startTransition(() => {
      setSortField(field);
    });
  }, []);

  return [
    filteredUsers,
    {
      error,
      sortField,
      getUsers,
      filerUsersByName,
      sortUserByName,
    },
  ];
}
