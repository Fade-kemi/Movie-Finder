function Spinner() {
  return (
    <div className="flex min-h-32 items-center justify-center py-8" role="status" aria-live="polite">
      <span className="loading loading-spinner loading-lg text-primary" aria-label="Loading movies" />
      <span className="sr-only">Loading movies...</span>
    </div>
  )
}

export default Spinner
