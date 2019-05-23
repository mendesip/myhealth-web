import * as React from "react";
import Grid from "@material-ui/core/Grid";

import AccessForm from "../components/AccessForm";
import NCDList from "../components/NCDList";
import DialogAccess from "../components/DialogAccess";
import Dashboard from "../components/Dashboard";

export default class Index extends React.Component{

    state = {
        susNumber: null,
        accessCode: null,
        patient: null,
        ncds: null,
        selectedNcd: null,
        registers: null,
        dialogAccessOpen: false
    };

    setSelectedNcd = (ncd) => {
        this.setState({selectedNcd: ncd});
    };

    handleClose = () => {
        this.setState({dialogAccessOpen: false});
    };

    handleOpen = () => {
        this.setState({dialogAccessOpen: true});
    };

    handleSusNumberInput = (event) => {
        this.setState({susNumber: event.target.value});
    };
    handleAccessCodeInput = (event) => {
        this.setState({accessCode: event.target.value});
    };

    loadPatient = async () => {
        const requestBody = {
            request_data: {
                sus_number: this.state.susNumber.replace(/ /g,''),
                access_token: this.state.accessCode.toUpperCase()
            }
        };

        const userAction = async () => {
            const response = await fetch('https://myhealth-api.herokuapp.com/api/patient/loadByToken', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return await response.json();
        };

        const resp = await userAction();

        if(resp.success) {
            this.setState({ncds: resp.monitors});
            this.setState({registers: resp.registers});
            this.setState({patient: resp.patient_data});
        }else{
            this.handleOpen();
        }
    };

    render() {
        return (
            <Grid container
                  alignItems="center"
                  justify="center"
                  style={{height: "100%"}}>

                {this.state.patient === null && <AccessForm
                    loadPatient={this.loadPatient}
                    handleAccessCodeInput={this.handleAccessCodeInput}
                    handleSusNumberInput={this.handleSusNumberInput}
                />}
                {(this.state.patient !== null && this.state.selectedNcd === null) && <NCDList
                    ncds={this.state.ncds}
                    selectNcd={this.setSelectedNcd}
                />}

                {this.state.selectedNcd !== null && <Dashboard />}

                <DialogAccess
                    open={this.state.dialogAccessOpen}
                    handleClose={this.handleClose}
                    fullScreen={true}
                />

                <style jsx global>{`
                    html, body {
                        height: 100%;
                    }
                    #__next {
                        height: 100%;
                    }
                `}</style>

            </Grid>
        );
    }
}