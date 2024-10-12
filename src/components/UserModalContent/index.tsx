import { User } from "../../domain/User";
import style from "./style.module.scss";

type UserModalContentProps = { user: User };
export default function UserModalContent({ user }: UserModalContentProps) {
  return (
    <div className={style.container}>
      <p>
        <strong>Name:</strong> {user?.name}
      </p>
      <p>
        <strong>Username:</strong> {user?.username}
      </p>
      <p>
        <strong>Email:</strong>
        <a href={`mailto:${user?.email}`}>{user?.email}</a>
      </p>
      <p>
        <strong>Website:</strong>{" "}
        <a target="_blank" href={"//" + user?.website}>
          {user?.website}
        </a>
      </p>
      <p>
        <strong>Tel:</strong>
        <a href={`tel:${user?.phone}`}>{user?.phone}</a>
      </p>
      <address>
        <strong>Address:</strong>
        {user?.address.suite}, {user?.address.street}
        <br />
        {user?.address.city}
      </address>
      <p>
        <strong>Company:</strong>
        {user?.company.name}
      </p>
    </div>
  );
}
