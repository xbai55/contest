import React from "react";

export default function Panel({ eyebrow, title, actions, children, className = "" }) {
  return (
    <article className={`panel ${className}`}>
      {(eyebrow || title || actions) && (
        <div className="panel-heading">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2>{title}</h2>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </article>
  );
}
