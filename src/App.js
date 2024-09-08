import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import TaskColumn from './components/TaskColumn';
import AddTaskModal from './components/AddTaskModal';
import { Container, Grid, Button, Typography } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css'

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', 
    },
    secondary: {
      main: '#ff1744',  
    },
  },
  typography: {
    fontFamily: 'Roboto',
    h6: {
      fontSize: 24,
      fontWeight: 500,
    },
  },
});





function App() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);

  // Fetch tasks from Firestore
  useEffect(() => {
    db.collection('tasks').onSnapshot(snapshot => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

    <ThemeProvider theme={theme}>
    {/* Rest of your app */}
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Typography variant="h6">Desktop & Mobile Application</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create Task
        </Button>
        <AddTaskModal open={open} handleClose={handleClose} />
        <Grid container spacing={3}>
          <TaskColumn status="TODO" tasks={tasks} />
          <TaskColumn status="IN PROGRESS" tasks={tasks} />
          <TaskColumn status="COMPLETED" tasks={tasks} />
        </Grid>
      </Container>
    </DndProvider>
  </ThemeProvider>





    
  );
}

export default App;
