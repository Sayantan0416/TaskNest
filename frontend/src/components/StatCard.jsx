function StatCard({
  title,
  value,
  description,
  icon: Icon,
}) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">
          <Icon size={20} />
        </div>

        <span className="stat-title">
          {title}
        </span>
      </div>

      <div className="stat-value">
        {value}
      </div>

      <p className="stat-description">
        {description}
      </p>
    </div>
  );
}

export default StatCard;