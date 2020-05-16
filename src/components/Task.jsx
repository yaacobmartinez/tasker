import React, { useState } from 'react'
import { makeStyles, Paper, Typography, FormControlLabel, Checkbox, IconButton } from '@material-ui/core'
import { Cancel } from '@material-ui/icons'
import Axios from 'axios'
import { trigger, mutate } from 'swr'

const useStyles = makeStyles((theme) => ({
    result: {
        padding: theme.spacing(0, 2),
        margin: theme.spacing(2, 0),
        display: "flex",
        textAlign: "left",
        alignItems: "center",
        background: theme.palette.background.default
    },
    task: {
        flex: 1
    },
    taskDone: {
        flex: 1,
        textDecoration: "line-through"
    }
}))
function Task({ task, data }) {
    const classes = useStyles()
    const [status, setStatus] = useState(task.complete)
    const updateStatus = () => {
        setStatus(true)
        const updateTask = async () => {
            await Axios.put(`/tasks/${task.id}`, { complete: true }, false)
            trigger("/tasks")
        }
        updateTask()
    }
    const handleDelete = () => {
        const deleteTask = async () => {
            mutate("/tasks?_sort=createdAt:DESC", data.filter(t => t.id !== task.id), false)
            await Axios.delete(`/tasks/${task.id}`)
            trigger('/tasks?_sort=createdAt:DESC')
        }
        deleteTask()
    }
    return (
        <div>
            <Paper className={classes.result} elevation={0} key={task.id}>
                <Typography className={status ? classes.taskDone : classes.task}>{task.task}</Typography>
                <FormControlLabel
                    disabled={task.complete}
                    control={
                        <Checkbox
                            disabled={status ? false : true}
                            checked={status}
                            onChange={updateStatus}
                            name="complete"
                            color="primary"
                        />
                    }
                />
                <IconButton color="secondary" onClick={handleDelete}>
                    <Cancel />
                </IconButton>
            </Paper>
        </div>
    )
}

export default Task
