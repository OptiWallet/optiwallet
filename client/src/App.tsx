import { Route, Router } from "@solidjs/router";
import { ComponentProps, ValidComponent } from "solid-js";
import { QueryClientProvider } from "@tanstack/solid-query";
import { NavBar } from "./components/navbar";
import { CreditCards } from "./pages/creditCards/creditCards";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";
import { Admin } from "./pages/admin/admin";
import { queryClient } from "./libs/query-client";

const Header = (props: ComponentProps<ValidComponent>) => (
  <>
    <NavBar />
    <div class="mx-auto max-w-6xl h-full p-4 flex flex-col gap-3 bg-zinc-100 dark:bg-zinc-900">
      {props.children}
    </div>
  </>
);

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router root={Header}>
        <Route path="/" component={Home} />
        <Route path="/creditcards" component={CreditCards} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
      </Router>
    </QueryClientProvider>
  );
};
