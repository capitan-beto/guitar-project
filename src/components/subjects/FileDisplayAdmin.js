import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EditBtn from '../EditBtn';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../base"
import EditTitle from '../EditTitle';
import EditDesc from '../EditDesc';

const FileDisplayAdmin = ({ files }) => {
  const [itemOnEdit, setItemOnEdit] = useState("");
  const [input, setInput] = useState(null);
  const [inputDesc, setInputDesc] = useState(null);

  const updateEdit = async (id) => {
    const docRef = doc(db, "percusionlat", id);
    if (input) {
      console.log(`title: ${input}`);
      await updateDoc(docRef, { title: input});
    } 
    if (inputDesc) {
      console.log(`desc: ${inputDesc}`)
      await updateDoc(docRef, { desc: inputDesc });
    }
    setInput(null);
    setInputDesc(null);
  }

  const startEdit = (item, state) => {
   if (!state) return setItemOnEdit(item);
   else return setItemOnEdit("");
  }

  return (
    files && <div>
      {files.map(({ title, desc, path, id }) => {
        return <div
            className='modal show'
            style={{ display: "block", position: "initial" }}
            key={id}
          >
            <Modal.Dialog>
              <Modal.Header>
                <EditTitle itemOnEdit={itemOnEdit} title={title} setInput={setInput}/>
                <EditBtn item={title} startEdit={startEdit} updateEdit={updateEdit} id={id}/>
              </Modal.Header>
              <Modal.Body>
                <EditDesc itemOnEdit={itemOnEdit} title={title} setInputDesc={setInputDesc} desc={desc}/>
                <p>
                  <a href={path} target='_blank' rel='noreferrer'>
                    <Button>Abrír</Button>
                  </a>
                </p>
              </Modal.Body>
            </Modal.Dialog>
          </div>
      })}
    </div>
  )
}

export default FileDisplayAdmin