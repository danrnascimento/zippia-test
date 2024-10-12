import { startTransition, useCallback, useMemo, useState } from "react";
import { User } from "../domain/User";
import fetchUsers from "../services/user";

type UseUsersReturn = [
  User[] | undefined,
  {
    error?: Error;
    sortField: string;
    pagination: { page: number; hasNextPage?: boolean; hasPrevPage?: boolean };
    getUsers: (page?: number, limit?: number) => void;
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

/**
 * The pagination feature is mocked because https://jsonplaceholder.typicode.com/users doesn't have a pagination feature
 * so I just imagined a pagination feature
 */

export default function useUsers(): UseUsersReturn {
  const [fetchResult, setFetchResult] = useState<
    { users?: User[]; page: number; error?: Error } | undefined
  >(undefined);

  const [nameQuery, setNameQuery] = useState<string>("");
  const [sortField, setSortField] = useState<string>("");

  const users = fetchResult?.users;
  const error = fetchResult?.error;
  const { page } = fetchResult || { page: 1 };
  const pagination = { page, hasNextPage: page < 3, hasPrevPage: page > 1 };

  const getUsers = useCallback(async (page: number = 1, limit?: number) => {
    const [result, fetchError] = await fetchUsers(page, limit);
    setFetchResult({
      error: fetchError,
      users: result,
      page,
    });
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
      pagination,
      getUsers,
      filerUsersByName,
      sortUserByName,
    },
  ];
}
