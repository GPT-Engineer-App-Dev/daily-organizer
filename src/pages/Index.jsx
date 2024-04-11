import React, { useState, useEffect } from "react";
import { Box, Heading, Input, Button, Checkbox, Flex, IconButton, Text, Spacer, useToast } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    toast({
      title: "Task deleted",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const updateTask = () => {
    if (editTask.text.trim() !== "") {
      const updatedTasks = tasks.map((task, i) => (i === editTask.index ? { ...task, text: editTask.text } : task));
      setTasks(updatedTasks);
      setEditTask(null);
    }
  };

  return (
    <Box maxWidth="500px" margin="auto" p={4}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Todo App
      </Heading>
      <Flex mb={4}>
        <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter a new task" mr={2} />
        <Button onClick={addTask} colorScheme="blue" leftIcon={<FaPlus />}>
          Add
        </Button>
      </Flex>
      {tasks.map((task, index) => (
        <Flex key={index} alignItems="center" mb={2}>
          <Checkbox isChecked={task.completed} onChange={() => toggleComplete(index)} mr={2} />
          {editTask?.index === index ? (
            <Input value={editTask.text} onChange={(e) => setEditTask({ ...editTask, text: e.target.value })} onBlur={updateTask} autoFocus />
          ) : (
            <Text flex={1} textDecoration={task.completed ? "line-through" : "none"}>
              {task.text}
            </Text>
          )}
          <Spacer />
          <IconButton icon={<FaEdit />} onClick={() => setEditTask({ index, text: task.text })} mr={2} />
          <IconButton icon={<FaTrash />} onClick={() => deleteTask(index)} colorScheme="red" />
        </Flex>
      ))}
    </Box>
  );
};

export default Index;
