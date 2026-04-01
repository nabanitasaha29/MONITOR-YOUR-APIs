

// testing
import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Home, Layers, Settings } from "lucide-react";
import "./Sidebar.css";

import { sidebarConfig } from "../sidebar/sidebarConfig.js";

const Icons = { Home, Layers, Settings };

const Sidebar = ({ collapsed, onToggle }) => {
  const [openGroups, setOpenGroups] = useState(false);

  // separate open tracking for each dynamic section
  const [openSections, setOpenSections] = useState({});

  const expandIntentRef = useRef(false);

  useEffect(() => {
    const cls = "sidebar-is-collapsed";
    document.body.classList.toggle(cls, collapsed);

    if (collapsed && !expandIntentRef.current) {
      setOpenGroups(false);
      setOpenSections({});
    }

    return () => document.body.classList.remove(cls);
  }, [collapsed]);

  const handleGroupsClick = () => {
    if (collapsed) {
      expandIntentRef.current = true;

      onToggle?.();

      requestAnimationFrame(() => {
        setOpenGroups(true);

        setTimeout(() => {
          expandIntentRef.current = false;
        }, 200);
      });
    } else {
      setOpenGroups((v) => !v);
    }
  };

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderMenu = (item) => {
    const Icon = Icons[item.icon];

    if (item.type === "link") {
      return (
        <NavLink
          key={item.id}
          to={item.to}
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
          end
        >
          <span className="item-icon">{Icon && <Icon size={18} />}</span>
          {!collapsed && <span className="item-label">{item.label}</span>}
        </NavLink>
      );
    }

    if (item.type === "group") {
      return (
        <div key={item.id} className="sidebar-group">
          <button
            type="button"
            className="sidebar-item group-toggle"
            onClick={handleGroupsClick}
            aria-expanded={!collapsed && openGroups}
          >
            <span className="item-icon">{Icon && <Icon size={18} />}</span>
            {!collapsed && <span className="item-label">{item.label}</span>}
          </button>

          {!collapsed && openGroups && (
            <div className="submenu open">{item.children.map(renderMenu)}</div>
          )}
        </div>
      );
    }

    // Nested Farmer Registry
    if (item.type === "nested") {
      const isOpen = openSections[item.id];

      return (
        <div key={item.id}>
          <button
            type="button"
            className="submenu-item has-children"
            onClick={() => toggleSection(item.id)}
            aria-expanded={isOpen}
          >
            <span className="submenu-label">{item.label}</span>
            <span className={`chev ${isOpen ? "open" : ""}`}>▾</span>
          </button>

          {isOpen && (
            <div className="submenu nested open">
              {item.children.map((state) => (
                <NavLink
                  key={state.code}
                  to={`/groups/${item.id}/${state.code}`}
                  className={({ isActive }) =>
                    `submenu-link ${isActive ? "active" : ""}`
                  }
                  end
                >
                  <span className="arrow" />
                  {state.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Dynamic list: Mappers, DCS, DPE
    if (item.type === "dynamic-list") {
      const isOpen = openSections[item.id];

      return (
        <div key={item.id}>
          <button
            type="button"
            className="submenu-item has-children"
            onClick={() => toggleSection(item.id)}
            aria-expanded={isOpen}
          >
            <span className="submenu-label">{item.label}</span>
            <span className={`chev ${isOpen ? "open" : ""}`}>▾</span>
          </button>

          {isOpen && (
            <div className="submenu nested open">
              {item.children.map((row) => (
                <NavLink
                  key={row.code}
                  to={`/groups/${item.id}/${row.code}`}
                  className={({ isActive }) =>
                    `submenu-link ${isActive ? "active" : ""}`
                  }
                  end
                >
                  <span className="arrow" />
                  {row.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top">
        <button className="hamburger" onClick={onToggle}>
          <Menu className="hamburger-icon" size={22} />
        </button>
      </div>

      <nav className="sidebar-menu">{sidebarConfig.map(renderMenu)}</nav>

      <div className="sidebar-bottom"></div>
    </aside>
  );
};

export default Sidebar;
