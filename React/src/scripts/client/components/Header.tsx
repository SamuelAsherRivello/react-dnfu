import React from 'react';
import { useWebsite } from '../data/GlobalContext';

const Header: React.FC = () => {

  const websiteName = useWebsite();
  return (
       <p>{websiteName} - This is about helping Ukraine.</p>
  );
};

export default Header;