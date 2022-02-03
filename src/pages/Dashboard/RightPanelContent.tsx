import React from 'react';
import Create from './components/Create';
import FileInfo from './components/FileInfo';
import Upload from './components/Upload';
import CreateUpload from './components/CreateUpload';
import UploadedFilesInfo from './components/UploadedFilesInfo';
import UploadFilesView from './components/UploadFilesView';
import CreateRoom from '../Rooms/CreateRoom';
import JoinRoom from '../Rooms/JoinRoom';
import Chat from '../Rooms/Chat';

const switchComponents = (active:string, setActive:any) => ({
  'file-info': <FileInfo />,
  'create-file-info': <Create />,
  'attach-files': <Upload />,
  'create-attach-files': <CreateUpload />,
  'uploaded-files-info': <UploadedFilesInfo />,
  'uploaded-files-view': <UploadFilesView />,
  'create-room': <CreateRoom />,
  'join-room': <JoinRoom setActive={setActive} />,
  'chat':<Chat />,
}[active]);

export default switchComponents;
