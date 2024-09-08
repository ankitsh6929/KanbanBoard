import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import TaskCard from './TaskCard';
import { useDrop } from 'react-dnd';
import { db } from '../firebase';

const TaskColumn = ({ status, tasks }) => {

  const [, drop] = useDrop({
    accept: 'task',
    drop: (item) => {
      if (item.status !== status) {
        db.collection('tasks').doc(item.id).update({ status });
      }
    },
  });

  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <Grid item xs={12} md={4} ref={drop} className={`task-column ${status.toLowerCase().replace(" ", "-")}`}>
      <Typography variant="h6" gutterBottom>
        {status}
      </Typography>
      <Paper className="task-column-paper">
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Paper>
    </Grid>
  );
};

export default TaskColumn;
