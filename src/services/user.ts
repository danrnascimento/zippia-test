import axios from "axios";
import { User } from "../domain/User";

/**
 * The pagination feature is mocked because https://jsonplaceholder.typicode.com/users doesn't have a pagination feature
 * so I just imagined a pagination feature
 */

type Response = [User[], undefined] | [undefined, Error];

export default async function fetchUsers(
  page: number = 1,
  limit: number = 10
): Promise<Response> {
  try {
    const result = await axios.get(
      `https://jsonplaceholder.typicode.com/users?page=${page}&limit=${limit}`
    );
    return [
      (result.data as User[]).map((user) => ({
        ...user,
        name: (user.name += ` (${page})`),
      })),
      undefined,
    ];
  } catch {
    return [undefined, new Error("Failed to get users")];
  }
}
