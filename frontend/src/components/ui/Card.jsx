export default function Card({ title, subtitle, rating, right }) {
    return (
        <div className="card">
        <div>
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
            {rating != null && <span> {rating}</span>}
        </div>

        <div className="card-actions">
            {right}
        </div>
        </div>
    )
}