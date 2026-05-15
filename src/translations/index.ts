import commonEn from "./en/common";
import levelsEn from "./en/levels";
import terminalEn from "./en/terminal";
import homeEn from "./en/home";
import playgroundEn from "./en/playground";
import installationEn from "./en/installation";
import faqEn from "./en/faq";

import commonDe from "./de/common";
import levelsDe from "./de/levels";
import terminalDe from "./de/terminal";
import homeDe from "./de/home";
import playgroundDe from "./de/playground";
import installationDe from "./de/installation";
import faqDe from "./de/faq";

import commonFa from "./fa/common";
import levelsFa from "./fa/levels";
import terminalFa from "./fa/terminal";
import homeFa from "./fa/home";
import playgroundFa from "./fa/playground";
import installationFa from "./fa/installation";
import faqFa from "./fa/faq";

import commonHi from "./hi/common";
import levelsHi from "./hi/levels";
import terminalHi from "./hi/terminal";
import homeHi from "./hi/home";
import playgroundHi from "./hi/playground";
import installationHi from "./hi/installation";
import faqHi from "./hi/faq";

import commonTe from "./te/common";
import levelsTe from "./te/levels";
import terminalTe from "./te/terminal";
import homeTe from "./te/home";
import playgroundTe from "./te/playground";
import installationTe from "./te/installation";
import faqTe from "./te/faq";

export const translations: Record<string, Record<string, string>> = {
    en: {
        ...commonEn,
        ...levelsEn,
        ...terminalEn,
        ...homeEn,
        ...playgroundEn,
        ...installationEn,
        ...faqEn,
    },
    de: {
        ...commonDe,
        ...levelsDe,
        ...terminalDe,
        ...homeDe,
        ...playgroundDe,
        ...installationDe,
        ...faqDe,
    },
    fa: {
        ...commonFa,
        ...levelsFa,
        ...terminalFa,
        ...homeFa,
        ...playgroundFa,
        ...installationFa,
        ...faqFa,
    },
    hi: {
        ...commonHi,
        ...levelsHi,
        ...terminalHi,
        ...homeHi,
        ...playgroundHi,
        ...installationHi,
        ...faqHi,
    },
    te: {
        ...commonTe,
        ...levelsTe,
        ...terminalTe,
        ...homeTe,
        ...playgroundTe,
        ...installationTe,
        ...faqTe,
    },
};
