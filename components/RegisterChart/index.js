import React from "react";
import Chart from "chart.js";

const units = {
    weight: 'kg',
    systolic: 'mmHg',
    diastolic: 'mmHg',
    heartBeats: 'bpm',
    glycemicRate: 'mg/dl',
    hour: 'hs'
};

export default class RegisterChart extends React.Component {
    state = {
        chartData: this.props.chartData,
        ncdName: this.props.ncdName,
        chart: null
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.state.chart.config.data = this.props.chartData;
        console.log(this.props.completeData);
        console.log(this.state.chart);
        this.state.chart.update();
    }

    tooltipData = (tooltipItems, data) => {
        let text = "";
        let index = tooltipItems[0].index;

        this.props.completeData[index].forEach(register => {
            for(let field in register){
                if (register[field] === null | register[field] === undefined) continue;
                text += field + ": " + register[field] + " " + units[field] + "    ";
            }
            text += "\n-------------------\n";
        });

        return text;
    };

    componentDidMount(){
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
                    intersect: true,
                    callbacks: {
                        footer: (tooltipItems, data) => this.tooltipData(tooltipItems, data)
                    }
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
        this.setState({chart: new Chart(ctx, config)});
    }
    render() {
        return (
            <div style={{height: "100%", width: "100%"}}>
                <canvas id="register_chart" style={{height: "100%", width: "100%"}}/>
            </div>
        );
    }
}