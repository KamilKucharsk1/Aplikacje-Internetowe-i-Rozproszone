import React from "react"
import { AppBar, Toolbar} from "material-ui";
import { Typography} from "material-ui/styles/typography"

export default props =>
<AppBar position="static">
    <Toolbar>
        <Typography variant="headline">
        Excercise
        </Typography>
        </Toolbar>
</AppBar>