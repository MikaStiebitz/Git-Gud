import commonEn from "./en/common";
import levelsEn from "./en/levels";
import terminalEn from "./en/terminal";
import homeEn from "./en/home";
import playgroundEn from "./en/playground";
import installationEn from "./en/installation";

import commonDe from "./de/common";
import levelsDe from "./de/levels";
import terminalDe from "./de/terminal";
import homeDe from "./de/home";
import playgroundDe from "./de/playground";
import installationDe from "./de/installation";

export const translations = {
    en: {
        ...commonEn,
        ...levelsEn,
        ...terminalEn,
        ...homeEn,
        ...playgroundEn,
        ...installationEn,
    },
    de: {
        ...commonDe,
        ...levelsDe,
        ...terminalDe,
        ...homeDe,
        ...playgroundDe,
        ...installationDe,
    },
};
