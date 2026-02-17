'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { TfiMenuAlt } from "react-icons/tfi";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="p-2 bg-white"
              onClick={() => setOpen(true)}
            
      >
              <TfiMenuAlt  size={25}/>
          </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 md:hidden">
          <div className="w-64 bg-white h-full shadow-lg">
            <Sidebar onClose={() => setOpen(false)} />
          </div>

          <div
            className="absolute inset-0 -z-10"
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default MobileSidebar;
