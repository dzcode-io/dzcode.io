export interface TryAgainProps {
  error: string;
  action: string;
  onClick: () => void;
}

export function TryAgain({ error, action, onClick }: TryAgainProps): JSX.Element {
  return (
    <div className="flex flex-col m-8 gap-4">
      <p>{error}</p>
      <button className="btn" onClick={onClick}>
        {action}
      </button>
    </div>
  );
}
