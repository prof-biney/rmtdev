type ResultsCountProps = {
  totalResults: number;
};

export default function ResultsCount({ totalResults }: ResultsCountProps) {
  return (
    <p className="count">
      <span className="u-bold">{totalResults}</span> results
    </p>
  );
}
