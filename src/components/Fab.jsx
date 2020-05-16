import React from "react";
import { makeStyles, Fab, Tooltip } from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
	link: {
		position: "fixed",
		bottom: theme.spacing(4),
		right: theme.spacing(4),
	},
}));
function CustomFab() {
	const classes = useStyles();
	return (
		<div>
			<Tooltip title='View Source on Github' placement='left' arrow>
				<Fab
					color='primary'
					className={classes.link}
					href='https://github.com/yaacobmartinez/tasker'>
					<GitHub />
				</Fab>
			</Tooltip>
		</div>
	);
}

export default CustomFab;
