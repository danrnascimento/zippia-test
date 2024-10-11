import axios from "axios";
import { User } from "../domain/User";

type Response = [User[], undefined] | [undefined, Error];

export default async function fetchUsers(): Promise<Response> {
  try {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return [result.data as User[], undefined];
  } catch {
    return [undefined, new Error("Failed to get users")];
  }
}
