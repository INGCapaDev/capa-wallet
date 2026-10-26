import { useSyncExternalStore } from 'react';
import { BANK_CARDS } from '@/data/cards';
import { FocusedCardPage } from '@/components/card/FocusedCardPage';
import { WalletPage } from '@/components/wallet/WalletPage';

const CARD_ROUTE_ALIASES: ReadonlyMap<string, string> = new Map([
  ['mp', 'mercadopago'],
]);

function subscribeToLocation(onChange: () => void) {
  window.addEventListener('popstate', onChange);
  window.addEventListener('hashchange', onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener('hashchange', onChange);
  };
}

function getLocationSnapshot() {
  return window.location.href;
}

export function AppRouter() {
  const location = useSyncExternalStore(subscribeToLocation, getLocationSnapshot);
  const pathname = new URL(location).pathname;

  if (pathname === '/') return <WalletPage key={location} />;

  const routeId = /^\/([^/]+)\/?$/.exec(pathname)?.[1];
  const cardId = routeId === undefined ? undefined : CARD_ROUTE_ALIASES.get(routeId) ?? routeId;
  const card = BANK_CARDS.find((candidate) => candidate.id === cardId);

  if (card) return <FocusedCardPage key={card.id} card={card} />;

  return (
    <main className="min-h-[100dvh] bg-[#08090d] text-slate-300 flex flex-col items-center justify-center gap-4 px-6 text-center font-['Geist','Inter',sans-serif]">
      <h1 className="text-lg">Página no encontrada</h1>
      <a href="/" className="underline underline-offset-4 hover:text-white">Volver al inicio</a>
    </main>
  );
}
