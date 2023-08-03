import * as React from 'react';

import { AddContentModal } from '@/app/components/addContentModal';

export default function HomePage() {
  return (
    <div className=' h-screen w-screen bg-black'>
      <AddContentModal />
    </div>
  );
}
