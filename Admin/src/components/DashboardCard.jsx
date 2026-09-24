import React from "react";

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  highlight = false,
}) => {
  return (
    <div className={`dashboard-card ${highlight ? "dashboard-card--highlight" : ""}`}>

      <div className="dashboard-card__top">
        <div className="dashboard-card__icon">
          <Icon size={22} strokeWidth={1.8} />
        </div>

        <span className="dashboard-card__label">
          {title}
        </span>
      </div>

      <h2 className="dashboard-card__value">
        {value}
      </h2>

    </div>
  );
};

export default DashboardCard;