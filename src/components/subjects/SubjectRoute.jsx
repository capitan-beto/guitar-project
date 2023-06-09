import React from 'react';
import FileDisplayAdmin from './FileDisplayAdmin';
import FileDisplay from './FileDisplay';
import { useFetchItems } from '../../hooks/useFetchItems';


const SubjectRoute = ({ logState, subject }) => {
  const { files } = useFetchItems(subject);

  return (
    logState ?
      <FileDisplayAdmin files={files} subject={subject} />
    :
      <FileDisplay files={files}/>
  )
}

export default SubjectRoute;