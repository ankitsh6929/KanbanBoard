import React, { useState } from 'react';
import { Modal, TextField, Button, MenuItem } from '@mui/material';
import { db } from '../firebase';

const EditTaskModal = ({ open, task, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = () => {
    db.collection('tasks').doc(task.id).update({
      title,
      description,
      status,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: '2em', backgroundColor: 'white', margin: '10% auto', width: '50%' }}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <TextField
          select
          label="Status"
          fullWidth
          margin="normal"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <MenuItem value="TODO">TODO</MenuItem>
          <MenuItem value="IN PROGRESS">IN PROGRESS</MenuItem>
          <MenuItem value="COMPLETED">COMPLETED</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default EditTaskModal;

