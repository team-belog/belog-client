interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40">
      <div className="size-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
      {message && (
        <p className="pretendard-m-14 mt-4 text-white">{message}</p>
      )}
    </div>
  );
}
