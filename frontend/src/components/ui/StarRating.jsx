export default function StarRating({ value = 0 }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`star ${i < value ? 'filled' : ''}`}
        />
      ))}
    </div>
  )
}