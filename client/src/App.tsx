import { Route, Router } from "@solidjs/router";
import { ComponentProps, ValidComponent } from "solid-js";
import { NavBar } from "./components/navbar";
import { CreditCards } from "./pages/creditCards/creditCards";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";

const Header = (props: ComponentProps<ValidComponent>) => (
  <>
    <NavBar />
    <div class="mx-auto max-w-5xl h-screen p-4 flex flex-col gap-3 bg-zinc-100 dark:bg-zinc-900">
      {props.children}
    </div>
  </>
);
export const App = () => {
  return (
    <>
      <Router root={Header}>
        <Route path="/" component={Home} />
        <Route path="/creditcards" component={CreditCards} />
        <Route path="/login" component={Login} />
      </Router>
    </>
  );
};
