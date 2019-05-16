import * as React from "react";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";

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

class Index extends React.Component{
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

                        <TextField
                            id="outlined-email-input"
                            label="SUS Number"
                            className={classes.textField}
                            type="text"
                            name="susNumber"
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            id="oil-input"
                            label="Access Code"
                            className={classes.textField}
                            type="text"
                            name="susNumber"
                            margin="normal"
                            variant="outlined"
                        />

                        <Link href="/ncd">

                            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                                Entrar
                            </Button>

                        </Link>

                    </Grid>

                </Paper>

            </Grid>
        );
    }
}

export default withStyles(styles)(Index);