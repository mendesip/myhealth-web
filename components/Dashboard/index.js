import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import RegisterChart from "../RegisterChart";
import DataSet from "../DataSet";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import {Typography} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker, KeyboardDatePicker} from '@material-ui/pickers';
import Chart from "chart.js";
import Fab from "@material-ui/core/Fab";
import ArrowBack from '@material-ui/icons/ArrowBack';

const fields = [
    ['weight', 'systolic', 'diastolic', 'heartBeats'],
    ['weight', 'systolic', 'diastolic', 'heartBeats'],
    ['glycemicRate'],
    ['weight', 'bodyfat']];

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: "100%",
        height: "100%"
    }
});

const ncdNames = ["Arterial hypertension", "Coronary artery disease", "Diabetes", "Obesity"];

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        let date1 = new Date(Date.now());
        date1.setDate(date1.getDate()-7);
        let date2 = new Date(Date.now());
        date2.setDate(date2.getDate()-1);
        this.state = {
            startDate: date1,
            endDate: date2,
            weight: true,
            systolic: true,
            diastolic: true,
            heartBeats: true,
            glycemicRate: true,
            bodyfat: true
        }
    }

    setStartDate = (date) => {
        this.setState({startDate: date})
    };

    setEndDate = (date) => {
        this.setState({endDate: date})
    };

    setFieldChecked = field => event => {
        this.setState({[field]: event.target.checked});
    };

    componentDidMount() {
        let config = {
            type: 'line',
            data: this.state.chartData,
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'NCD Monitoring: ' + this.state.ncdName
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                }
            }
        };
        let ctx = document.getElementById('register_chart').getContext('2d');
        let chart = new Chart(ctx, config);
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root} elevation={1}>
                <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.props.backToNCD}>
                    <ArrowBack />
                </Fab>
                <Grid container
                      style={{height: "100%"}}
                      alignItems="center"
                      direction="row">
                    <Grid item xs={2}>
                        <FormGroup>
                            <Typography
                                variant="h5"
                            >
                                Filter data
                            </Typography>
                            {fields[this.props.ncd].map(field => (
                                <FormControlLabel key={field}
                                    control={
                                        <Checkbox
                                            checked={this.state[field]}
                                            value={field}
                                            onChange={this.setFieldChecked(field)}
                                            color="primary"
                                        />
                                    }
                                    label={field}
                                />
                            ))}
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    margin="normal"
                                    label="Start Date"
                                    value={this.state.startDate}
                                    onChange={this.setStartDate}
                                />
                                <DatePicker
                                    margin="normal"
                                    label="End Date"
                                    value={this.state.endDate}
                                    onChange={this.setEndDate}
                                />
                            </MuiPickersUtilsProvider>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={10} className={classes.root}>
                        <RegisterChart
                            ncdName={ncdNames[this.props.ncd]}
                            completeData={new DataSet(this.props.ncd, this.props.registers, this.state).toChartData()}
                            chartData={new DataSet(this.props.ncd, this.props.registers, this.state).toChartData(this.state)}
                        />
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(Dashboard);