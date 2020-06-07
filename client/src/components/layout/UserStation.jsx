import React, { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EvStationIcon from "@material-ui/icons/EvStation";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ChargerIcon from "../layout/ChargerIcon";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import Extras from "../layout/Extras";
import StationContext from "../../context/stations/stationContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "1rem 0",
    height: "10rem",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    height: "80%",
    justifyContent: "space-between",
  },

  icon: {
    height: "100%",
    width: "3rem",
    marginRight: "2rem",
  },
  wrapper: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    top: "0",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  adressBox: {
    flexDirection: "column",
  },
  niceButtons: {
    borderRadius: "2rem",
  },
  extras: {
    display: "flex",
  },
}));

const UserStation = ({ station }) => {
  const classes = useStyles();
  const stationContext = useContext(StationContext);
  const { setEditStation, userstations, deleteStation } = stationContext;

  const handleEdit = (id) => {
    let station = userstations.filter((station) => {
      console.log(station._id);
      return station._id === id;
    });

    let pickedStation = station[0];

    setEditStation(pickedStation);
  };

  const handleDelete = (id) => {
    deleteStation(id);
  };

  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={10}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Grid item xs={2}>
                <ChargerIcon plugin={station.plugin} />
              </Grid>
              <Box className={classes.adressBox}>
                <Typography variant="h6">{station.name}</Typography>
                <Typography variant="caption">
                  {station.country} {station.city} {station.street}{" "}
                  {station.streetNumber}
                </Typography>
                <Box className={classes.extras}>
                  {station.additives.map((extra, index) => (
                    <Extras key={index} extra={extra} />
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography variant="h2">{station.price} zł/h</Typography>
              </Box>
              <Box className={classes.box}>
                <Link
                  to="/edit-station"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(station._id)}
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(station._id)}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserStation;
