import type { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { BankCardData } from '@/types/card';
import { BankCard } from '@/components/card/BankCard';
import { Button } from '@/components/ui/Button';
import { useCarouselSwipe } from '@/hooks/use-carousel-swipe';
import { useWindowWidth } from '@/hooks/use-window-width';
import {
  getOrbitCardLayout,
  getOrbitGeometry,
} from '@/components/wallet/orbit-layout';

interface WalletCarouselProps {
  cards: readonly BankCardData[];
  currentIndex: number;
  isFlipped: boolean;
  copiedClabe: boolean;
  onFlip: () => void;
  onCopyClabe: (event?: MouseEvent) => void;
  onSelectCard: (card: BankCardData) => void;
  onPreviousCard: () => void;
  onNextCard: () => void;
}

export function WalletCarousel({
  cards,
  currentIndex,
  isFlipped,
  copiedClabe,
  onFlip,
  onCopyClabe,
  onSelectCard,
  onPreviousCard,
  onNextCard,
}: WalletCarouselProps) {
  const windowWidth = useWindowWidth();
  const geometry = getOrbitGeometry(windowWidth);
  const {
    handlePointerDown,
    handlePanStart,
    handlePanEnd,
    handleClickCapture,
  } = useCarouselSwipe({ onPreviousCard, onNextCard });
  const totalCards = cards.length;

  return (
    <motion.div
      className="relative w-full max-w-6xl h-[330px] xs:h-[360px] sm:h-[410px] md:h-[450px] flex items-center justify-center perspective-1500 overflow-visible"
      style={{ touchAction: 'pan-y' }}
      onPointerDownCapture={handlePointerDown}
      onPanStart={handlePanStart}
      onPanEnd={handlePanEnd}
      onClickCapture={handleClickCapture}
    >
      <Button
        onClick={onPreviousCard}
        size="icon"
        shape="circle"
        className="hidden lg:flex absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-40"
        title="Tarjeta anterior"
        aria-label="Tarjeta anterior"
        icon={<ChevronLeft className="w-4 h-4" />}
      />

      <Button
        onClick={onNextCard}
        size="icon"
        shape="circle"
        className="hidden lg:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-40"
        title="Tarjeta siguiente"
        aria-label="Tarjeta siguiente"
        icon={<ChevronRight className="w-4 h-4" />}
      />

      <div className="relative w-full h-full flex items-center justify-center transform-style-3d pointer-events-none">
        {cards.map((card, index) => {
          const layout = getOrbitCardLayout(index, currentIndex, totalCards, geometry);

          return (
            <motion.div
              key={card.id}
              initial={false}
              animate={{
                x: layout.x,
                y: layout.y,
                z: layout.z,
                rotateY: layout.rotateY,
                scale: layout.scale,
                opacity: layout.opacity,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 28,
                mass: 0.8,
              }}
              style={{
                zIndex: layout.zIndex,
                width: `${geometry.cardBaseWidth}px`,
                transformStyle: 'preserve-3d',
              }}
              className={`absolute pointer-events-auto transition-filter duration-200 ${
                layout.isCenter ? 'cursor-default' : 'cursor-pointer hover:opacity-100'
              }`}
            >
              <BankCard
                card={card}
                {...(layout.isCenter
                  ? { mode: 'active', isFlipped, onFlip, onCopyClabe, copiedClabe }
                  : { mode: 'neighbor', onSelect: () => onSelectCard(card) })}
              />

              {layout.isCenter && (
                <div
                  className="absolute -bottom-[80%] left-0 right-0 h-[65%] rounded-2xl sm:rounded-3xl pointer-events-none opacity-20 blur-[2px] overflow-hidden -z-20 hidden xs:block"
                  style={{
                    transform: 'scaleY(-1)',
                    WebkitMaskImage:
                      'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)',
                    maskImage:
                      'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)',
                  }}
                >
                  <BankCard
                    card={card}
                    mode="reflection"
                    className="opacity-70"
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
