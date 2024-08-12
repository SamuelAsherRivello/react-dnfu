import React from 'react';

interface NavBarProps {
  pages: Array<{ type: string; title: string }>;
  onNavClick: (pageType: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ pages, onNavClick }) => {
  return (
    <nav>
      <ul>
        {pages.map((page) => (
          <li key={page.type}>
            <button onClick={() => onNavClick(page.type)}>{page.title}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;