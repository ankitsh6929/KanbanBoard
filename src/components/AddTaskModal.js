import React, { useState } from 'react';
import { Modal, TextField, Button, MenuItem } from '@mui/material';
import { db } from '../firebase';
import { DatePicker } from '@mui/lab';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const AddTaskModal = ({ open, handleClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('TODO');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState(null);

  const handleSubmit = () => {
    db.collection('tasks').add({
      title,
      description,
      status,
      priority,
      dueDate: dueDate ? dueDate.toISOString() : null, // Save as ISO string
    });
    handleClose();
    setTitle('');
    setDescription('');
    setStatus('TODO');
    setPriority('Low');
    setDueDate(null);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal-container"  style={{ padding: '2em', backgroundColor: 'white', margin: '10% auto', width: '50%' }}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          select
          label="Status"
          fullWidth
          margin="normal"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="TODO">TODO</MenuItem>
          <MenuItem value="IN PROGRESS">IN PROGRESS</MenuItem>
          <MenuItem value="COMPLETED">COMPLETED</MenuItem>
        </TextField>
        <TextField
          select
          label="Priority"
          fullWidth
          margin="normal"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Due Date"
            value={dueDate}
            onChange={(newDate) => setDueDate(newDate)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </LocalizationProvider>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Task
        </Button>
      </div>
    </Modal>
  );
};

export default AddTaskModal;
