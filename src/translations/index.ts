import commonEn from "./en/common";
import levelsEn from "./en/levels";
import terminalEn from "./en/terminal";
import homeEn from "./en/home";
import playgroundEn from "./en/playground";

import commonDe from "./de/common";
import levelsDe from "./de/levels";
import terminalDe from "./de/terminal";
import homeDe from "./de/home";
import playgroundDe from "./de/playground";

export const translations = {
    en: {
        ...commonEn,
        ...levelsEn,
        ...terminalEn,
        ...homeEn,
        ...playgroundEn,
    },
    de: {
        ...commonDe,
        ...levelsDe,
        ...terminalDe,
        ...homeDe,
        ...playgroundDe,
    },
};
