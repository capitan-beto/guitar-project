import React, { useState } from 'react';
import Button from "react-bootstrap/Button";

const EditBtn = ({ startEdit, item, updateEdit }) => {
  const [onEdit, setOnEdit] = useState(false);

  const handleClick = (e) => {
    setOnEdit(!onEdit);
    startEdit(item, onEdit);
    if (onEdit) {
      updateEdit();
    }
  }

  return (
    <Button variant='outline-secondary' onClick={(e) => handleClick(e)}>
        { onEdit ? `Save` : `Edit` }
    </Button>
  )
}

export default EditBtn