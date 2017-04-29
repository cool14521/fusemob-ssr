export * from "./lazy";

import { transition } from "./stateful-funcs";
import { links } from "./links";
import { RouteConfig } from "yester";
import { IStores } from "stores";

export type RouteFunc = (stores: IStores) => RouteConfig;

function notFound(stores: IStores): RouteConfig {
    const run = () => transition(
        { route: "*", stores: stores },
        async () => {
            stores.router.navigate(links.home());
        }
    );

    const config: RouteConfig = {
        $: "*"
    };

    if (stores.status.client) {
        config.enter = run;
    } else {
        config.beforeEnter = run;
    }

    return config;
}

export function Routes(stores: IStores): RouteConfig[] {
    return [
        notFound(stores)
    ];
}

export { links, transition }
