import React, { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Page } from './App';

interface ContentProps {
  page: Page | null;
}

const Content: React.FC<ContentProps> = ({ page }) => {
  const nodeRef = useRef(null);

  if (!page || page.content.length < 100) {

    //Return an empty "SOMETHING" so the page layout doesn't jump around
    return <div ref={nodeRef} className="content" />;
  }

  return (
    <SwitchTransition>
      <CSSTransition
        key={page.type}
        nodeRef={nodeRef}
        classNames="content-transition"
        timeout={200}
      >
        <div ref={nodeRef} className="content" dangerouslySetInnerHTML={{ __html: page.content }} />
        </CSSTransition>
    </SwitchTransition>
  );
};

export default Content;