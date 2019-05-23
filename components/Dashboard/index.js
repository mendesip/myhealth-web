import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Chart from "chart.js";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    }
});


class Dashboard extends React.Component{
    randomScalingFactor = function() {
        return Math.round(Samples.utils.rand(-100, 100));
    };

    componentDidMount() {
        var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var config = {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Systolic pressure',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                    data: [
                        120,110,130,140,130,120,120
                    ],
                    fill: false,
                }, {
                    label: 'Diastolic pressure',
                    fill: false,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 0.2)',
                    data: [
                        90,80,95,110,100,90,80
                    ],
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'NCD Monitoring: Hypertension'
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
                            labelString: 'Month'
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
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, config);
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root} elevation={1}>
                <Grid container
                      alignItems="center"
                      direction="column">


                </Grid>
                <div>
                    <canvas id="myChart" width="400" height="400"/>
                </div>

            </Paper>
        );
    }
}

export default withStyles(styles)(Dashboard);