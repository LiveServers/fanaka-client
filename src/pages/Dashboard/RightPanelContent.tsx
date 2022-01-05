import React from 'react';
import Create from './components/Create';
import FileInfo from './components/FileInfo';
import Upload from './components/Upload';

const switchComponents = (active:string) => ({
  'file-info': <FileInfo />,
  'create': <Create />,
  'attach-files': <Upload />,
}[active]);

export default switchComponents;
