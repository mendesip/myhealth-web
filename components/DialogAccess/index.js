import withMobileDialog from "@material-ui/core/withMobileDialog";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class DialogAccess extends React.Component {
    render() {

        return (

            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"myHealth access error"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Authentication data is invalid. Please check the information provided.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Try again
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
export default withMobileDialog()(DialogAccess);