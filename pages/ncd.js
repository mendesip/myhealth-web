import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    }
});

class NCD extends React.Component{
    render() {
        const { classes } = this.props;
        return (
            <Grid container
                  alignItems="center"
                  justify="center"
                  style={{height: "100%"}}>

                <Paper className={classes.root} elevation={1}>
                    <Grid container
                          alignItems="center"
                          direction="column">

                        <Typography variant="h5" component="h3">
                            myHealth
                        </Typography>

                        <List component="nav">
                            <Link href="/dashboard">
                                <ListItem button>
                                    <ListItemText primary="Arterial hypertension" />
                                </ListItem>
                            </Link>
                            <Link href="/dashboard">
                                <ListItem button>
                                    <ListItemText primary="Coronary artery disease" />
                                </ListItem>
                            </Link>
                            <Link href="/dashboard">
                                <ListItem button>
                                    <ListItemText primary="Diabetes" />
                                </ListItem>
                            </Link>
                            <Link href="/dashboard">
                                <ListItem button>
                                    <ListItemText primary="Obesity" />
                                </ListItem>
                            </Link>
                        </List>
                    </Grid>

                </Paper>

            </Grid>
        );
    }
}

export default withStyles(styles)(NCD);