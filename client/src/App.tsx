import { Button } from "@/components/ui/button";
import { TextField, TextFieldRoot } from "@/components/ui/textfield";
import { createSignal } from "solid-js";
import { NavBar } from "./components/navbar";
import { Card, CardContent } from "./components/ui/card";
import { Filters } from "./components/filters/filters.component";

export const App = () => {
  let nameField: HTMLInputElement | undefined;
  const [name, setName] = createSignal<string>("Guest");

  return (
    <>
      <NavBar />
      <div class="mx-auto max-w-5xl h-screen p-4 flex flex-col gap-3 bg-zinc-100 dark:bg-zinc-900">
        <Filters />
        <Card>
          <CardContent>
            Welcome {name()}!
            <TextFieldRoot>
              <TextField placeholder="Enter your name" ref={nameField} />
            </TextFieldRoot>
            <Button on:click={() => setName(nameField?.value ?? "")}>
              Submit
            </Button>
            <Button on:click={() => setName(nameField?.value ?? "")}>
              Submit
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
