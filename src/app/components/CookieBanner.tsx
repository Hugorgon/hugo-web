import { useState } from 'react';
import { Link } from 'react-router';
import { Container } from './Container';
import { ROUTES } from '../../data/routes';

/**
 * Cookie notice banner.
 *
 * Lightweight, self-contained notice for strictly-necessary cookies only —
 * žádný complex consent manager, žádné analytics, žádný marketing.
 *
 * Persistence:
 *  - Klíč v localStorage: `hugo:cookieConsent` = `'accepted'` po kliku.
 *  - Bez tohoto klíče se banner zobrazí.
 *  - Když je localStorage zablokovaný (Safari private apod.), banner se
 *    raději nezobrazí, než aby se opakoval při každém navigačním kroku.
 *    Notice je pro nezbytné cookies, ne tracking — soft-degrade je OK.
 *
 * Visual:
 *  - Fixed bottom, plná šířka, dark Hugo paleta, oranžový primary button.
 *  - Container drží stejnou max-w a horizontální padding jako Navbar/Footer.
 *  - Mobile: text + akce stackují vertikálně; desktop: text vlevo, akce vpravo.
 *
 * Accessibility:
 *  - `role="region"` + `aria-label` označí banner jako pojmenovaný landmark
 *    bez modal trapu (notice je informativní, ne blokující dialog).
 *  - `focus-visible` ring na obou interactive elementech.
 *  - Button má `type="button"` (nikdy nesubmittne formulář).
 */
const CONSENT_STORAGE_KEY = 'hugo:cookieConsent';
const CONSENT_VALUE = 'accepted';

const BANNER_TEXT =
  'Tento web používá nezbytné cookies pro správné fungování a může využívat ' +
  'anonymní technické údaje. Pokračováním souhlasíte se zpracováním podle ' +
  'zásad ochrany soukromí.';

const PRIVACY_LINK_LABEL = 'Zásady ochrany soukromí';
const ACCEPT_BUTTON_LABEL = 'Rozumím';
const REGION_ARIA_LABEL = 'Souhlas s cookies';

function readInitialVisibility(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) !== CONSENT_VALUE;
  } catch {
    // localStorage zablokovaný — nezobrazovat opakovaně.
    return false;
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState<boolean>(readInitialVisibility);

  if (!visible) return null;

  const handleAccept = () => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, CONSENT_VALUE);
    } catch {
      // Storage blocked — schováme banner alespoň v rámci této session.
    }
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label={REGION_ARIA_LABEL}
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#111214]/95 backdrop-blur-lg border-t border-[#2A2B31]"
    >
      <Container>
        <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-5">
          <p className="text-[#D1D5DB] text-sm leading-relaxed max-w-3xl">
            {BANNER_TEXT}{' '}
            <Link
              to={ROUTES.privacy}
              className="text-[#F59E0B] hover:text-[#FFB84D] underline underline-offset-2 transition-colors duration-200 ease-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111214] rounded"
            >
              {PRIVACY_LINK_LABEL}
            </Link>
            .
          </p>

          <button
            type="button"
            onClick={handleAccept}
            className="self-start sm:self-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium bg-[#F59E0B] text-[#0A0A0B] hover:bg-[#FFB84D] transition duration-200 ease-soft active:scale-[0.98] select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111214]"
          >
            {ACCEPT_BUTTON_LABEL}
          </button>
        </div>
      </Container>
    </div>
  );
}
