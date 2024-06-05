import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Client } from "https://deno.land/x/mysql/mod.ts";

interface User {
  id: number;
  password: string;
  name: string;
  admin: string;
}

const connectionParam = {
  hostname: "db",
  username: "ユーザー名",
  password: "パスワード",
  db: "testdb",

};

const client = await new Client().connect({
  hostname: "172.17.0.1",
  username: "seed",
  db: "techdb",
  password: "Tech_123",
  port:33062
});

await client.execute(`
  CREATE TABLE IF NOT EXISTS users (
      id int(11) NOT NULL AUTO_INCREMENT,
      name varchar(100) NOT NULL,
      created_at timestamp not null default current_timestamp,
      PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`);

export default function Home() {
  const count = useSignal(3);

  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          FRESH
          <code class="mx-2">BOY</code> NANAKI
        </p>
        <p>{user}</p>
        <Counter count={count} />
      </div>
    </div>
  );
}
