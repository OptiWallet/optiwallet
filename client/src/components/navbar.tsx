import logo from "@/assets/logo.svg";
import theme from "@/assets/theme.svg";
import { NavigationMenu } from "@kobalte/core/navigation-menu";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { createSignal, onCleanup, onMount } from "solid-js";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNavigate } from "@solidjs/router";
import { FiMenu } from "solid-icons/fi";
import { IoSettingsOutline } from "solid-icons/io";
import { useDimensionsStore, useIsMobile } from "@/store/window.store";

export interface NavBarProps {
  loggedIn?: boolean;
}

const NavBarLargeScreen = (props: NavBarProps) => {
  const { loggedIn = false } = props;

  return (
    <>
      <div class="flex justify-between bg-background sticky top-0 px-2 drop-shadow-md z-50">
        <NavigationMenu class={"flex items-center h-14"}>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              withArrow={false}
              as="a"
              href="/"
              imgSrc={logo}
              class="h-11 w-11 p-0 mt-1"
            ></NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger withArrow={false} as="a" href="/creditcards">
              Credit Cards
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              withArrow={false}
              as="a"
              href="/bankaccounts"
            >
              Bank Accounts
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenu>
        <NavigationMenu class={"flex items-center h-14 gap-2"}>
          <NavigationMenuItem>
            {loggedIn ? (
              <NavigationMenuTrigger
                withArrow={false}
                as="a"
                href="/profile"
                class="h-8 w-8 p-1"
              >
                Profile
              </NavigationMenuTrigger>
            ) : (
              <NavigationMenuTrigger
                withArrow={false}
                as="a"
                href="/login"
                class="h-8 w-8 p-1"
              >
                Login
              </NavigationMenuTrigger>
            )}
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              withArrow={false}
              as="a"
              href="/darkmode"
              imgSrc={theme}
              class="h-5 w-5 p-0 mt-1"
            ></NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
    </>
  );
};

const NavBarMobile = (props: NavBarProps) => {
  const { loggedIn = false } = props;
  const navigate = useNavigate();

  return (
    <>
      <div class="flex justify-between bg-background sticky top-0 px-2 drop-shadow-md z-50">
        {/* Left: burger menu */}
        <DropdownMenu>
          <DropdownMenuTrigger class="h-11 w-11 p-0 mt-1">
            <FiMenu />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => navigate("/")}>
              Home
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => navigate("/creditcards")}>
              Credit Cards
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => navigate("/bankaccounts")}>
              Bank Accounts
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Right: settings and dark mode */}
        <div class="flex flex-row items-center">
          <DropdownMenu>
            <DropdownMenuTrigger class="h-11 w-11 flex mt-1 items-center justify-center">
              <IoSettingsOutline />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {loggedIn ? (
                <DropdownMenuItem onSelect={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onSelect={() => navigate("/login")}>
                  Login
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            class="h-11 w-11 p-0 mt-1 flex items-center justify-center"
            onClick={() => navigate("/darkmode")}
          >
            <img src={theme} alt="Dark mode" class="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export const NavBar = (props: NavBarProps) => {
  const { loggedIn = false } = props;
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile() ? (
        <NavBarMobile loggedIn={loggedIn} />
      ) : (
        <NavBarLargeScreen loggedIn={loggedIn} />
      )}
    </>
  );
};
