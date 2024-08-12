import React from 'react';
import { Page } from './App';


interface ContentProps {
  page: Page | null;
}

const Content: React.FC<ContentProps> = ({ page }) => {
  if (!page) {
    return <div>No content available</div>;
  }

  return (
    <div>
      <h1>{page.type}</h1>
      <p>{page.content}</p>
    </div>
  );
};

export default Content;