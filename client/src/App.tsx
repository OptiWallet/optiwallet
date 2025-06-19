import { createSignal } from "solid-js";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { TextField, TextFieldRoot } from "@/components/ui/textfield";

export const App = () => {
  let nameField: HTMLInputElement | undefined;
  const [name, setName] = createSignal<string>('Moshe');
  return (
    <>
      <NavigationMenu>
        <NavigationMenuItem>
          <NavigationMenuTrigger withArrow={false}>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/">Go to Home</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger withArrow={false}>Credit Cards</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/about">Learn more about us</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger withArrow={false}>Bank Accounts</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/contact">Get in touch</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem> 
      </NavigationMenu>
      <div>
        Welcome {name() || "Guest"}!
        <TextFieldRoot>
          <TextField placeholder="Name" ref={nameField} />
        </TextFieldRoot>
        <Button on:click={() => setName(nameField?.value ?? '')}>Press here!</Button>
      </div>
    </>
  );
};