import { InMemoryCache } from '@apollo/client';
import {
  breadCrumbList,
  cardData,
  semesterCardProps,
  fileInfo,
  errorHandler,
  files,
  createUnit,
  studentId,
  studentFileData,
  setFile,
  setRoom,
  setRoomId, setMessages,
} from './reactiveVariables';

export const ApolloCache:InMemoryCache = new InMemoryCache({
  typePolicies:{
    Query:{
      fields:{
        breadCrumbList:{
          read(){
            return breadCrumbList();
          },
        },
        cardData:{
          read(){
            return cardData();
          },
        },
        semesterCardProps:{
          read(){
            return semesterCardProps();
          },
        },
        fileInfo: {
          read() {
            return fileInfo();
          },
        },
        errorHandler: {
          read() {
            return errorHandler();
          },
        },
        files: {
          read() {
            return files();
          },
        },
        createUnit: {
          read() {
            return createUnit();
          },
        },
        studentId: {
          read() {
            return studentId();
          },
        },
        studentFileData: {
          read() {
            return studentFileData();
          },
        },
        setFile: {
          read() {
            return setFile();
          },
        },
        setRoom: {
          read() {
            return setRoom();
          },
        },
        setRoomId: {
          read() {
            return setRoomId();
          },
        },
        setMessages: {
          read() {
            return setMessages();
          },
        },
      },
    },
  },
});
