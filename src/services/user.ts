import axios from "axios";
import { User } from "../domain/User";

export default async function fetchUsers() {
  try {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return result.data as User[];
  } catch {
    return [];
  }
}
