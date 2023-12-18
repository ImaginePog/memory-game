// React imports
import { useEffect, useState } from "react";

export default function Timer({ initialDuration, event, className, pause }) {
  const [timeRemaining, setTimeRemaining] = useState(initialDuration);

  useEffect(() => {
    let interval;
    if (timeRemaining > 0 && !pause) {
      interval = setInterval(() => setTimeRemaining(timeRemaining - 1), 1000);
    } else {
      // Fire the event
      event();
    }

    return () => clearInterval(interval);
  }, [pause, timeRemaining]);

  return <p className={className}>Time:{timeRemaining}</p>;
}
