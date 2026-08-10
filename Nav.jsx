import { NavLink } from "react-router-dom";

const ITEMS = [
  { to: "/",         label: "HOME",     glyph: "❄" },
  { to: "/cave",     label: "CAVE",     glyph: "🕳" },
  { to: "/mountain", label: "MOUNTAIN", glyph: "🏔" },
];

export default function Nav() {
  return (
    <nav className="ynav" aria-label="YETZI navigation">
      {ITEMS.map((it) => (
        <NavLink
          key={it.to}
          to={it.to}
          end={it.to === "/"}
          className={({ isActive }) => "ynav__link" + (isActive ? " is-active" : "")}
        >
          <span className="ynav__glyph" aria-hidden="true">{it.glyph}</span>
          <span className="ynav__label">{it.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
