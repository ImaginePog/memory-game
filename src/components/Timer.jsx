// React imports
import { useEffect, useState } from "react";

export default function Timer({ initialDuration, event }) {
  const [timeRemaining, setTimeRemaining] = useState(initialDuration);

  useEffect(() => {
    if (timeRemaining > 0) {
      setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
    } else {
      // Fire the event
      event();
    }
  }, [timeRemaining]);

  return <h1>{timeRemaining}</h1>;
}
