// React imports
import { useEffect, useState } from "react";

export default function Timer({ initialDuration, event, className }) {
  const [timeRemaining, setTimeRemaining] = useState(initialDuration);

  useEffect(() => {
    if (timeRemaining > 0) {
      setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
    } else {
      // Fire the event
      event();
    }
  }, [timeRemaining]);

  return <p className={className}>Time:{timeRemaining}</p>;
}
