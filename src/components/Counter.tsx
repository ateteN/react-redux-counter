import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { increment, decrement, reset, setValue } from "../store/actions/counterActions";
import styles from "./Counter.module.css";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const [customValue, setCustomValue] = useState("");

  const handleSetValue = () => {
    const parsed = Number(customValue);
    if (!isNaN(parsed)) {
      dispatch(setValue(parsed));
      setCustomValue("");
    }
  };

  return (
    <div className={styles.counterContainer}>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>

      <div className={styles.customValueRow}>
        <input
          type="number"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          placeholder="Set custom value"
        />
        <button onClick={handleSetValue}>Set</button>
      </div>
    </div>
  );
};

export default Counter;