import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Content from './Content';
import Footer from './Footer';
import pagesData from '../data/pages.json';
import Header from './Header';
import '../../../styles/App.css';

export interface Page {
  type: string;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);

  useEffect(() => {
    setPages(pagesData.pages);
    setCurrentPage(pagesData.pages[0]);
  }, []);

  useEffect(() => {
    if (currentPage) {
      fetchPageContent(currentPage.content);
    }
  }, [currentPage]);

  const fetchPageContent = async (contentFile: string) => {
    try {
      const response = await fetch(`/src/scripts/client/data/pages/${contentFile}`);
      const content = await response.text();
      setCurrentPage((prevPage) => {
        if (prevPage) {
          return { ...prevPage, body: content };
        }
        return null;
      });
    } catch (error) {
      console.error('Error fetching page content:', error);
    }
  };

  const handleNavClick = (pageType: string) => {
    const selectedPage = pages.find((page) => page.type === pageType);
    if (selectedPage) {
      setCurrentPage(selectedPage);
    }
  };

  return (
    <div className="App">
      <Header />
      <NavBar pages={pages} onNavClick={handleNavClick} />
      <Content page={currentPage} />
      <Footer />
    </div>
  );
};

export default App;