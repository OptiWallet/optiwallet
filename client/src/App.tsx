import { Button } from "@/components/ui/button";
import { TextField, TextFieldRoot } from "@/components/ui/textfield";
import { createSignal } from "solid-js";
import { NavBar } from "./components/navbar";
  
export const App = () => {
  let nameField: HTMLInputElement |    undefined;
  const [name, setName] = createSignal<string>('Guest');
  return (
    <>
      <NavBar/>
      <div class='mx-auto max-w-5xl p-4 flex flex-col items-center justify-center gap-3 bg-zinc-100 dark:bg-zinc-900'>
        Welcome {name()}!
        <TextFieldRoot>
          <TextField placeholder="Enter your name" ref={nameField} />
        </TextFieldRoot>
        <Button on:click={() => setName(nameField?.value ?? '')}>Press here!</Button>
      </div>
    </>
  );
};