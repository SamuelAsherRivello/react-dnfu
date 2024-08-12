

import React from 'react';
import { useWebsite } from '../data/GlobalContext';

const Footer: React.FC = () => {

  const websiteName = useWebsite();
  return (
    <footer>
       <p>{websiteName} &copy; 2024 All rights reserved.</p>
    </footer>
  );
};

export default Footer;