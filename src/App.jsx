import { useEffect, useState } from "react";
import { User } from "./User";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    // fetch user data
    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: AbortController.signal,
    })
      .then((res) => res.json())
      .then(setUsers)
      .finally(() => {
        setIsLoading(false);
      });

    // prevent code from running multiple times
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <h1>User List</h1>
      {isLoading ? (
        <h2>Loading....</h2>
      ) : (
        <ul>
          {/* outputs a list with user data */}
          {users != null &&
            users.map((user) => {
              // {...user} will out put all props from user instead of writing all props {user.name} etc.
              // this is only used with multile props
              return <User {...user} key={user.id} />;
            })}
        </ul>
      )}
    </>
  );
}

export default App;
