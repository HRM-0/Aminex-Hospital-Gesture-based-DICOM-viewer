import React, { createContext, useState, useEffect, useCallback } from "react";

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true); // Auto-show on mount
  const [minDurationPassed, setMinDurationPassed] = useState(false); // Track 10s minimum
  const [forceClose, setForceClose] = useState(false); // Track 1-min timeout
  const [mountTime] = useState(Date.now()); // Track mount time

  // 10-second minimum display duration
  useEffect(() => {
    const minTimer = setTimeout(() => {
      setMinDurationPassed(true);
    }, 10000);

    return () => clearTimeout(minTimer);
  }, []);

  // 1-minute maximum display duration (force close if still loading)
  useEffect(() => {
    const maxTimer = setTimeout(() => {
      setForceClose(true);
      setIsLoading(false); // Force close after 1 minute
    }, 60000);

    return () => clearTimeout(maxTimer);
  }, []);

  const completeLoading = useCallback(() => {
    // If force close already triggered, just close
    if (forceClose) {
      setIsLoading(false);
      return;
    }

    // If minimum duration hasn't passed, calculate remaining time
    if (!minDurationPassed) {
      const elapsedTime = Date.now() - mountTime;
      const remainingTime = Math.max(0, 10000 - elapsedTime);

      if (remainingTime > 0) {
        // Wait for minimum duration before closing
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
        return () => clearTimeout(timer);
      }
    }

    // Minimum duration has passed, close immediately
    setIsLoading(false);
  }, [minDurationPassed, forceClose, mountTime]);

  return (
    <LoadingContext.Provider value={{ isLoading, completeLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
