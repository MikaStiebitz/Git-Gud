"use client";

import { PageLayout } from "~/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useLanguage } from "~/contexts/LanguageContext";

export default function ImpressumPage() {
    const { language } = useLanguage();

    return (
        <PageLayout>
            <div className="min-h-screen bg-[#1a1625] text-purple-100">
                <div className="container mx-auto p-4 py-8">
                    <h1 className="mb-6 text-center text-3xl font-bold text-white">Impressum</h1>

                    <Card className="mb-8 border-purple-900/20 bg-purple-900/10">
                        <CardHeader>
                            <CardTitle className="text-white">
                                {language === "de" ? "Angaben gemäß § 5 TMG" : "Information according to § 5 TMG"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-purple-200">
                            <p>
                                <strong>
                                    {language === "de" ? "Verantwortlich für den Inhalt:" : "Responsible for content:"}
                                </strong>
                                <br />
                                Mika Stiebitz
                                <br />
                                Karlstraße 11
                                <br />
                                91522 Ansbach
                                <br />
                                {language === "de" ? "Deutschland" : "Germany"}
                            </p>

                            <p>
                                <strong>{language === "de" ? "Kontakt:" : "Contact:"}</strong>
                                <br />
                                E-Mail: mika.stiebitz@gmail.com
                                <br />
                            </p>

                            {language === "de" ? (
                                <>
                                    <h2 className="mt-6 text-xl font-semibold text-white">Haftungsausschluss</h2>

                                    <h3 className="mt-4 text-lg font-medium text-purple-300">Haftung für Inhalte</h3>
                                    <p>
                                        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
                                        Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine
                                        Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
                                        Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§
                                        8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
                                        übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
                                        Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                                    </p>

                                    <h3 className="mt-4 text-lg font-medium text-purple-300">Haftung für Links</h3>
                                    <p>
                                        Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir
                                        keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                                        Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                                        Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden
                                        zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                                        Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                                    </p>

                                    <h3 className="mt-4 text-lg font-medium text-purple-300">Urheberrecht</h3>
                                    <p>
                                        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                                        unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                                        Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                                        bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                                        Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
                                        Gebrauch gestattet.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h2 className="mt-6 text-xl font-semibold text-white">Disclaimer</h2>

                                    <h3 className="mt-4 text-lg font-medium text-purple-300">Liability for Content</h3>
                                    <p>
                                        The contents of our pages were created with the utmost care. However, we cannot
                                        guarantee the accuracy, completeness, and timeliness of the content. As a
                                        service provider, we are responsible for our own content on these pages in
                                        accordance with § 7 Sec. 1 of the German Telemedia Act (TMG). According to §§ 8
                                        to 10 TMG, however, we as a service provider are not obligated to monitor
                                        transmitted or stored third-party information or to investigate circumstances
                                        that indicate illegal activity.
                                    </p>

                                    <h3 className="mt-4 text-lg font-medium text-purple-300">Liability for Links</h3>
                                    <p>
                                        Our website contains links to external third-party websites over whose content
                                        we have no influence. Therefore, we cannot accept any liability for this
                                        third-party content. The respective provider or operator of the linked pages is
                                        always responsible for their content. The linked pages were checked for possible
                                        legal violations at the time of linking. Illegal content was not apparent at the
                                        time of linking.
                                    </p>

                                    <h3 className="mt-4 text-lg font-medium text-purple-300">Copyright</h3>
                                    <p>
                                        The content and works created by the site operators on these pages are subject
                                        to German copyright law. Duplication, processing, distribution, and any form of
                                        commercialization of such material beyond the scope of the copyright law require
                                        the written consent of its respective author or creator. Downloads and copies of
                                        this site are only permitted for private, non-commercial use.
                                    </p>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageLayout>
    );
}
