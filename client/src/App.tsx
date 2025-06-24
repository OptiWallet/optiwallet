import { Button } from "@/components/ui/button";
import { TextField, TextFieldRoot } from "@/components/ui/textfield";
import { createSignal } from "solid-js";
import { NavBar } from "./components/navbar";
import { Card, CardContent } from "./components/ui/card";
import { Filter } from "./components/filter/filter.component";

const creditScoreOptions: string[] = ["100", "200", "300", "400", "500"];

const incomeOptions: string[] = ["100", "200", "300", "400", "500"];

export const App = () => {
  let nameField: HTMLInputElement | undefined;
  const [name, setName] = createSignal<string>("Guest");
  const [creditScore, setCreditScore] = createSignal<string>();
  const [income, setIncome] = createSignal<string>();

  return (
    <>
      <NavBar />
      <div class="mx-auto max-w-5xl h-screen p-4 flex flex-col gap-3 bg-zinc-100 dark:bg-zinc-900">
        <Card>
          <CardContent class="flex flex-row gap-4 items-center">
            <Filter
              options={creditScoreOptions}
              placeholder="Credit Score"
              onChange={setCreditScore}
            />
            <Filter
              options={incomeOptions}
              placeholder="Income"
              onChange={setIncome}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            Welcome {name()}!
            <TextFieldRoot>
              <TextField placeholder="Enter your name" ref={nameField} />
            </TextFieldRoot>
            <Button on:click={() => setName(nameField?.value ?? "")}>
              Submit
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
