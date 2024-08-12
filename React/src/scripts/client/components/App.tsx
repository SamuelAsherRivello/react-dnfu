import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Content from './Content';
import Footer from './Footer';
import pagesData from '../data/pages.json';
import DOMPurify from 'dompurify';
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
    const urlParams = new URLSearchParams(window.location.search);
    const navBarParam = urlParams.get('navBar');
    const navBarParamPage = navBarParam
      ? pagesData.pages.find(page => page.type === navBarParam)
      : pagesData.pages[0];
    setCurrentPage(navBarParamPage || pagesData.pages[0]);
  }, []);

  useEffect(() => {
    if (currentPage) {
      fetchPageContent(currentPage.content);
      updateURL(currentPage.type);
    }
  }, [currentPage]);

  const fetchPageContent = async (contentFile: string) => {
    try {

      //TODO: Why do I need this check. its like the page loads then calls load with the full html as param
      if (contentFile.includes('<')) {
        return;
      }

      //TODO: Remove this later. The pathing is forked here because I can't figure out
      //how to have the pages loaded well using one page url
      //for both running live from /dist/ and running on localhost
      const isLocalhost = window.location.hostname === 'localhost';
      const basePath = isLocalhost ? '' : '/react-dnfu';

      //Works well...
      const response = await fetch(`${basePath}/src/scripts/client/data/pages/${contentFile}`);
      const result = await response.text();

      const sanitizedHtml = DOMPurify.sanitize(result, { ADD_TAGS: ['iframe'], ADD_ATTR: ['allowfullscreen'] });

      setCurrentPage((prevPage) => {
        if (prevPage) {
          return { ...prevPage, content: sanitizedHtml };
        }
        return null;
      });
    } catch (error) {
      console.error(`Error fetching ${contentFile}, page content:`, error);
    }
  };

  const handleNavClick = (pageType: string) => {
    const selectedPage = pages.find((page) => page.type === pageType);
    if (selectedPage) {
      setCurrentPage(selectedPage);
    }
  };

  const updateURL = (pageType: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('navBar', pageType);
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="App">
      <NavBar
        pages={pages}
        onNavClick={handleNavClick}
        currentPage={currentPage?.type || ''}
      />
      <Content page={currentPage} />
      <Footer />
    </div>
  );
};

export default App;