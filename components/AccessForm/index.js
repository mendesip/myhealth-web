import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

import MaskedInput from 'react-text-mask';

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,]}
            placeholderChar={'\u2000'}
        />
    );
}

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
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


class AccessForm extends React.Component{
    render() {
        const { classes } = this.props;
        return (
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
                        autoComplete={"sus-number"}
                        inputProps={{
                            style: {textAlign: "center"}
                        }}
                        InputProps={{
                            inputComponent: TextMaskCustom,
                        }}
                        onChange={this.props.handleSusNumberInput}
                    />

                    <TextField
                        id="oil-input"
                        label="Access Code"
                        className={classes.textField}
                        type="text"
                        name="accessCode"
                        margin="normal"
                        variant="outlined"
                        autoComplete={"one-time-code"}
                        inputProps={{
                            style: {textAlign: "center", textTransform: "uppercase"}
                        }}
                        onChange={this.props.handleAccessCodeInput}
                    />

                    <Button type="button" onClick={this.props.loadPatient} variant="contained" color="primary" className={classes.button}>
                        Enter
                    </Button>

                </Grid>

            </Paper>
        );
    }
}

export default withStyles(styles)(AccessForm);