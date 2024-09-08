import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { db } from '../firebase';
import EditTaskModal from './EditTaskModal';
import { useDrag } from 'react-dnd';


const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

const TaskCard = ({ task }) => {
  const [openEdit, setOpenEdit] = useState(false);

  const handleDelete = () => {
    db.collection('tasks').doc(task.id).delete();
  };

  const handleEdit = () => {
    setOpenEdit(true);
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Card ref={drag} style={{ opacity: isDragging ? 0.5 : 1, marginBottom: '1em' }}>
      <CardContent>
      
        <Box display="flex" flexDirection="column" mb={2}>
          <Typography variant="h5" gutterBottom>
            {capitalizeWords(task.title)}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {task.description}
          </Typography>
        </Box>

     
        <Box mb={2}>
          <Typography variant="body2" color="textSecondary" style={{ fontWeight: 'bold' }}>
            Priority: {task.priority}
          </Typography>
        </Box>

  
        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" color="primary" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </CardContent>

      <EditTaskModal open={openEdit} task={task} onClose={() => setOpenEdit(false)} />
    </Card>
  );
};

export default TaskCard;
