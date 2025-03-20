import { useJobItemsContext } from "../lib/hooks";

export default function ResultsCount() {
  const { totalResults } = useJobItemsContext();

  return (
    <p className="count">
      <span className="u-bold">{totalResults}</span> results
    </p>
  );
}
