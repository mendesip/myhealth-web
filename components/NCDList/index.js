import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    }
});

const ncdNames = ["Arterial hypertension", "Coronary artery disease", "Diabetes", "Obesity"];

class NCDList extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.root} elevation={1}>
                <Grid container
                      alignItems="center"
                      direction="column">

                    <Typography variant="h5" component="h3">
                        myHealth
                    </Typography>

                    {this.props.ncds.length === 0 &&
                    <Typography variant="h5" component="h3">
                        Dados de acesso não encontrados
                    </Typography>
                    }
                    {this.props.ncds.length !== 0 &&
                    <List component="nav">
                        {this.props.ncds.map(ncd => (
                            <ListItem button key={ncd.ncd_id}>
                                <ListItemText
                                    primary={ncdNames[ncd.ncd_id]}
                                    onClick={() => this.props.selectNcd(ncd.ncd_id)}
                                />
                            </ListItem>
                        ))}
                    </List>
                    }
                </Grid>

            </Paper>
        );
    }
}

export default withStyles(styles)(NCDList);