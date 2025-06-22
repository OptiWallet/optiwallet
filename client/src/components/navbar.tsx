import logo from "@/assets/logo.svg";
import theme from "@/assets/theme.svg";
import { NavigationMenu } from "@kobalte/core/navigation-menu";
import { NavigationMenuItem, NavigationMenuTrigger } from "./ui/navigation-menu";

export interface NavBarProps {
    loggedIn?: boolean;
}

export const NavBar = (props: NavBarProps) => {
    const {loggedIn = false} = props;

    return (
        <>
            <div class='flex justify-between bg-background sticky top-0 px-2 drop-shadow-md'>
                <NavigationMenu class={'flex items-center h-14'}>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger withArrow={false} as= 'a' href="/" class="h-12 w-12 p-1">
                            { <img src={logo}></img> } 
                        </NavigationMenuTrigger>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger withArrow={false} as= 'a' href="/creditcards">Credit Cards</NavigationMenuTrigger>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger withArrow={false} as= 'a' href="/bankaccounts">Bank Accounts</NavigationMenuTrigger>
                    </NavigationMenuItem> 
                </NavigationMenu>
                <NavigationMenu class={'flex items-center h-14 gap-2'}>
                    <NavigationMenuItem>
                        { loggedIn ?  (
                            <NavigationMenuTrigger withArrow={false} as= 'a' href="/profile" class="h-8 w-8 p-1">
                            Profile
                        </NavigationMenuTrigger> 
                        ):(
                        <NavigationMenuTrigger withArrow={false} as= 'a' href="/login" class="h-8 w-8 p-1">
                            Login
                        </NavigationMenuTrigger>
                        )}
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger withArrow={false} as= 'a' href="/darkmode" class="h-8 w-8 p-1"> { <img src={theme}></img> } </NavigationMenuTrigger>
                    </NavigationMenuItem>
                </NavigationMenu>
            </div>
        </>
    );
};