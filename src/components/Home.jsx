import React, { useState } from 'react'
import { makeStyles, Grid, Paper, IconButton, InputBase, Divider } from '@material-ui/core'
import { Send } from '@material-ui/icons'
import useSWR, { mutate, trigger } from 'swr'
import Axios from 'axios'
import Task from './Task'
const useStyles = makeStyles((theme) => ({
    uroot: {
        marginTop: theme.spacing(2)
    },
    main: {
        padding: theme.spacing(2)
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    content: {
        padding: theme.spacing(0, 2),
        textAlign: "center"
    },
}))

function Home() {
    const classes = useStyles()
    const { data } = useSWR("/tasks?_sort=createdAt:DESC")
    const initialState = {
        task: "",
        complete: false
    }
    const [task, setTask] = useState(initialState)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (task.task) {
            const addTask = async () => {
                mutate('/tasks?_sort=createdAt:DESC', [...data, task], false)
                await Axios.post("/tasks?_sort=createdAt:DESC", task)
                trigger("/tasks?_sort=createdAt:DESC")
            }
            addTask()
            setTask(initialState)
            return
        }

    }
    return (
        <div className={classes.uroot}>
            <Grid container spacing={2}>
                <Grid item xs={false} sm={2} />
                <Grid item xs={12} sm={8}>
                    <div className={classes.content}>
                        <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
                            <InputBase
                                autoFocus
                                value={task.task}
                                onChange={(e) => { setTask({ ...task, task: e.target.value }) }}
                                className={classes.input}
                                placeholder="New Task"
                            />
                            <Divider className={classes.divider} orientation="vertical" />
                            <IconButton color="primary" className={classes.iconButton} onClick={handleSubmit}>
                                <Send />
                            </IconButton>
                        </Paper>
                        {data ? data.sort((a, b) => a.createdAt - b.createdAt).map((task) => (
                            <Task key={task.id} task={task} data={data} />
                        ))
                            : null}
                    </div>
                </Grid>
                <Grid item xs={false} sm={2} />
            </Grid>
        </div>
    )
}

export default Home

