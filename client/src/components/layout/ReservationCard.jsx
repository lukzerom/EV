import React, { useContext, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import ReservationContext from "../../context/reservations/reservationContext";
import StationContext from "../../context/stations/stationContext";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import moment from "moment";
import UpdateIcon from "@material-ui/icons/Update";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles({
  root: {
    margin: "2rem",
    width: "100%",
  },

  title: {
    fontSize: "2rem",
  },

  row: {
    display: "flex",
    flexDirection: "row",
  },

  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  icon: {
    fontSize: "5rem",
    color: "#303030",
  },
  register: {
    backgroundColor: "#eef9bf",
    borderRadius: "4px",
    flexGrow: 1,
  },
  pluginIcon: {
    height: "4rem",
    width: "30%",
  },
  divider: {
    margin: "1rem 0",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filler: {
    flexGrow: 1,
  },
  acceptance: {
    display: "inline-block",
  },
  smallIcon: {
    fontSize: "1rem",
  },
  green: {
    color: "#22bb33",
    display: "inline-block",
  },
  red: {
    color: "#bb2124",
    display: "inline-block",
  },
  card: {
    margin: "1rem",
  },
});

const ReservationCard = ({ reservation }) => {
  const classes = useStyles();
  const reservationContext = useContext(ReservationContext);
  const stationContext = useContext(StationContext);

  const { getStation } = stationContext;

  const { deleteReservation, toggleMapModal } = reservationContext;

  //   getCar(reservation.car);

  let from = moment(reservation.timeStampFrom).format("YYYY-MM-DD HH:00");
  let to = moment(reservation.timeStampTo).format("YYYY-MM-DD HH:00");

  const verification = (accepted, rejected) => {
    if (!accepted && !rejected) {
      return (
        <Typography display="inline" className={classes.acceptance}>
          <UpdateIcon className={classes.smallIcon} /> Pending
        </Typography>
      );
    }

    if (accepted) {
      return (
        <Typography display="inline" className={classes.green}>
          <CheckIcon className={classes.smallIcon} /> Accepted
        </Typography>
      );
    }

    if (rejected) {
      return (
        <Typography display="inline" className={classes.red}>
          <CancelIcon className={classes.smallIcon} /> Rejected
        </Typography>
      );
    }
  };

  const handleDelete = (id) => {
    deleteReservation(id);
  };

  const handleMapModal = async (id) => {
    toggleMapModal(true);
    await getStation(id);
  };

  return (
    <>
      <Grid item xs={12} className={classes.card}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Grid container className={classes.row}>
              <Grid item xs={3}>
                <EmojiTransportationIcon className={classes.icon} />
              </Grid>

              <Fragment>
                <Typography className={classes.title}>
                  {reservation.stationCity}
                </Typography>
                <Typography color="textSecondary" variant="caption">
                  {reservation.stationStreet}
                </Typography>
              </Fragment>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container>
              <Grid xs={6} item>
                <Typography align="center">
                  <strong>Date from: </strong> {from}
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography align="center">
                  <strong>Date to :</strong> {to}
                </Typography>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />

            <Grid container>
              <Grid xs={6} item>
                <Typography align="center">
                  <strong>Owner:</strong> {reservation.ownerName}, Tel:{" "}
                  {reservation.ownerPhone}{" "}
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Grid align="center">
                  <Typography display="inline">Verification: </Typography>

                  {verification(
                    reservation.isOwnerAccepted,
                    reservation.isOwnerRejected
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container>
              <Grid xs={12} item>
                <Typography align="center">
                  Prepare <strong>{reservation.fullPrice}</strong> euros in
                  cash, please
                </Typography>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container className={classes.footer}>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleMapModal(reservation.station)}
              >
                See on map
              </Button>

              <Button
                id={reservation._id}
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => handleDelete(String(reservation._id))}
              >
                Delete
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default ReservationCard;
