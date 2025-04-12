import styles from "./OperationKeyboard.module.css";

const OperationKeyboard = ({ onKeyPress }) => {
  const symbols = ["A", "B", "C", "D", "∪", "∩", "−", "Δ", "(", ")", "ᶜ", "∅"];

  return (
    <div className={styles.keyboard}>
      <div className={styles.grid}>
        {symbols.map((symbol) => (
          <button
            key={symbol}
            className={styles.key}
            onClick={() => onKeyPress(symbol)}
          >
            {symbol}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OperationKeyboard;
