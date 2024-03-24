import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { UsersList } from "~/components/characters-list";

export default component$(() => {
  return (
    <UsersList/>
  );
});

export const head: DocumentHead = {
  title: "Magic World",
  meta: [
    {
      name: "description",
      content: "Characters from the Harry Potter saga",
    },
  ],
};
