"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import type { Badge, LevelInfo } from "@/types/gamification";
import BadgeUnlockedModal from "@/components/gamification/BadgeUnlockedModal";
import LevelUpModal from "@/components/gamification/LevelUpModal";

/* ------------------------------------------------------------------ */
/*  Context shape                                                      */
/* ------------------------------------------------------------------ */

interface GamificationContextValue {
  queueBadges: (badges: Badge[]) => void;
  triggerLevelUp: (oldLevel: LevelInfo, newLevel: LevelInfo) => void;
}

const GamificationContext = createContext<GamificationContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

interface GamificationProviderProps {
  children: ReactNode;
  lng: string;
}

export function GamificationProvider({ children, lng }: GamificationProviderProps) {
  const [badgeQueue, setBadgeQueue] = useState<Badge[]>([]);
  const [levelUp, setLevelUp] = useState<{
    old: LevelInfo;
    new: LevelInfo;
  } | null>(null);

  const queueBadges = useCallback((badges: Badge[]) => {
    setBadgeQueue((prev) => [...prev, ...badges]);
  }, []);

  const triggerLevelUp = useCallback((oldLevel: LevelInfo, newLevel: LevelInfo) => {
    setLevelUp({ old: oldLevel, new: newLevel });
  }, []);

  const onAllBadgesDismissed = useCallback(() => {
    setBadgeQueue([]);
  }, []);

  const onLevelUpDismissed = useCallback(() => {
    setLevelUp(null);
  }, []);

  return (
    <GamificationContext.Provider value={{ queueBadges, triggerLevelUp }}>
      {children}

      {/* Modals */}
      {badgeQueue.length > 0 && (
        <BadgeUnlockedModal
          badgeQueue={badgeQueue}
          onAllDismissed={onAllBadgesDismissed}
          lng={lng}
        />
      )}

      {levelUp && (
        <LevelUpModal
          oldLevel={levelUp.old}
          newLevel={levelUp.new}
          onDismiss={onLevelUpDismissed}
          lng={lng}
        />
      )}
    </GamificationContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useGamificationUI(): GamificationContextValue {
  const ctx = useContext(GamificationContext);
  if (!ctx) {
    throw new Error("useGamificationUI must be used within <GamificationProvider>.");
  }
  return ctx;
}
