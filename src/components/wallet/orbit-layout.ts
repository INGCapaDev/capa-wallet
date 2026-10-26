export interface OrbitGeometry {
  isMobile: boolean;
  orbitRadiusX: number;
  orbitRadiusZ: number;
  cardBaseWidth: number;
}

export interface OrbitCardLayout {
  isCenter: boolean;
  x: number;
  y: number;
  z: number;
  rotateY: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

export function getOrbitGeometry(windowWidth: number): OrbitGeometry {
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  return {
    isMobile,
    orbitRadiusX: isMobile ? 180 : isTablet ? 300 : 420,
    orbitRadiusZ: isMobile ? 90 : isTablet ? 140 : 200,
    cardBaseWidth: isMobile ? 280 : isTablet ? 330 : 380,
  };
}

export function getOrbitCardLayout(
  index: number,
  currentIndex: number,
  totalCards: number,
  geometry: OrbitGeometry
): OrbitCardLayout {
  let delta = (index - currentIndex) % totalCards;
  if (delta > totalCards / 2) delta -= totalCards;
  if (delta < -totalCards / 2) delta -= totalCards;

  const angle = (delta * (2 * Math.PI)) / totalCards;
  const isCenter = delta === 0;
  const cosNorm = (Math.cos(angle) + 1) / 2;
  const scale = isCenter
    ? 1
    : geometry.isMobile
    ? 0.58 + 0.35 * cosNorm
    : 0.68 + 0.28 * cosNorm;
  const opacity = isCenter
    ? 1
    : geometry.isMobile
    ? 0.88 + 0.11 * Math.pow(cosNorm, 0.7)
    : 0.92 + 0.08 * Math.pow(cosNorm, 0.7);

  return {
    isCenter,
    x: Math.sin(angle) * geometry.orbitRadiusX,
    y: -Math.pow(Math.sin(angle / 2), 2) * (geometry.isMobile ? 12 : 20),
    z: (Math.cos(angle) - 1) * geometry.orbitRadiusZ,
    rotateY: -Math.sin(angle) * (geometry.isMobile ? 28 : 38),
    scale,
    opacity,
    zIndex: Math.round(cosNorm * 30) + 10,
  };
}
