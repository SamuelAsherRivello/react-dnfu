import React from 'react';
import { Page } from './App';

interface NavBarProps {
  pages: Array<Page>;
  onNavClick: (pageType: string) => void;
  currentPage: string;
}

const NavBar: React.FC<NavBarProps> = ({ pages, onNavClick, currentPage }) => {
  return (
    <nav>
      <ul>
        {pages.map((page) => (
          <li key={page.type}>
            <button
              onClick={() => onNavClick(page.type)}
              className={currentPage === page.type ? 'selected' : ''}
            >
              {page.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;