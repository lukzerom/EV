import React, { useEffect, useContext, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import setAuthToken from "../../utils/setAuthToken";
import StationContext from "../../context/stations/stationContext";
import AlertContext from "../../context/alert/alertContext";
import axios from "axios";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddStationMap from "../layout/AddStationMap";
import MapIcon from "@material-ui/icons/Map";
import { GOOGLE_API_KEY } from "../API/API_KEYS";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  stationsWrapper: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    width: "100%",
  },
  topPanel: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem",
  },

  paper: {
    marginTop: "2rem",
    width: "100%",
    height: "90vh",
    display: "flex",
    justifyContent: "space-around",
  },
  inner: {
    padding: "1rem",
  },
  divider: {
    margin: "1rem 0",
  },
  inputs: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem 0",
  },
  formControl: {
    width: "50%",
  },
  select: {
    width: "10rem",
  },
  button: {
    width: "50%",
  },
}));

const EditStation = (props) => {
  const authContext = useContext(AuthContext);
  const stationContext = useContext(StationContext);
  const alertContext = useContext(AlertContext);
  const classes = useStyles();

  const { token } = authContext;
  const { setAlert } = alertContext;
  const {
    getUserStations,
    markerPosition,
    setMarkerPosition,
    editStation,
    updateStation,
  } = stationContext;

  useEffect(() => {
    authContext.loadUser();
    getUserStations();
    setMarkerPosition([editStation.latitude, editStation.longitude]);
    //eslint-disable-next-line
  }, []);

  const [state, setState] = useState({
    id: editStation._id,
    name: editStation.name,
    country: editStation.country,
    city: editStation.city,
    streetName: editStation.street,
    streetNumber: editStation.streetNumber,
    pictureUrl: editStation.picture,
    longitude: editStation.longitude,
    latitude: editStation.latitude,
    price: editStation.price,
    plugin: editStation.plugin,
    extras: [],
    drive: editStation.additives.includes("Drive"),
    bed: editStation.additives.includes("Bed"),
    bike: editStation.additives.includes("Bike"),
    coffee: editStation.additives.includes("Coffee"),
    bus: editStation.additives.includes("Bus"),
    errors: false,
  });

  const {
    id,
    name,
    country,
    city,
    streetName,
    streetNumber,
    pictureUrl,
    price,
    plugin,
    drive,
    bed,
    bike,
    coffee,
    bus,
    errors,
  } = state;

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onExtrasChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.checked,
    });
  };

  const getLatLang = async () => {
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${streetNumber}+${streetName}+${city}+${country}&key=${GOOGLE_API_KEY}`;
    delete axios.defaults.headers.common["x-auth-token"];
    try {
      const res = await axios.get(URL);
      let geocode = res.data;
      const latlang = geocode.results[0].access_points[0].location;

      setMarkerPosition([latlang.latitude, latlang.longitude]);
    } catch (err) {
      console.log(err.msg);
    }
  };

  const handleSubmit = () => {
    setAuthToken(token);
    let extras = [];

    if (drive) extras.push("Drive");
    if (bed) extras.push("Bed");
    if (bike) extras.push("Bike");
    if (coffee) extras.push("Coffee");
    if (bus) extras.push("Bus");

    if (!name || !country || !city || !streetName || !streetNumber || !plugin) {
      setState({ ...state, errors: true });
      return setAlert("Please provide required informations", "error");
    }

    const station = {
      id,
      name,
      country,
      city,
      street: streetName,
      streetNumber,
      picture: pictureUrl,
      price,
      plugin,
      latitude: markerPosition[0],
      longitude: markerPosition[1],
      additives: extras,
    };

    updateStation(station);

    props.history.push("/my-stations");
    setState({
      name: "",
      country: "",
      city: "",
      streetName: "",
      streetNumber: "",
      pictureUrl: "",
      longitude: 0,
      latitude: 0,
      price: 0,
      plugin: "",
      extras: [],
      drive: false,
      bed: false,
      bike: false,
      coffee: false,
      bus: false,
    });
  };

  return (
    <Box className={classes.stationsWrapper}>
      <Grid container justify="center">
        <Grid item xs={10}>
          <Grid container justify="center">
            <Paper className={classes.paper}>
              <Grid item xs={5} className={classes.inner}>
                <Box className={classes.inputs}>
                  <Typography variant="h6">
                    Provide your station details
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    startIcon={<EditIcon />}
                  >
                    Save Changes
                  </Button>
                </Box>
                <Divider className={classes.divider} />
                <TextField
                  required
                  id="outlined-required"
                  label="Station name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  variant="outlined"
                  fullWidth
                  error={errors && !name}
                />
                <Box className={classes.inputs}>
                  <TextField
                    required
                    error={errors && !country}
                    id="outlined-required"
                    label="Country"
                    name="country"
                    value={country}
                    onChange={onChange}
                    variant="outlined"
                  />
                  <TextField
                    required
                    error={errors && !city}
                    id="outlined-required"
                    label="City"
                    name="city"
                    value={city}
                    onChange={onChange}
                    variant="outlined"
                  />
                </Box>
                <Box className={classes.inputs}>
                  <TextField
                    required
                    error={errors && !streetName}
                    id="outlined-required"
                    label="Street Name"
                    name="streetName"
                    value={streetName}
                    onChange={onChange}
                    variant="outlined"
                  />
                  <TextField
                    required
                    error={errors && !streetNumber}
                    id="outlined-required"
                    label="Street Number"
                    name="streetNumber"
                    value={streetNumber}
                    onChange={onChange}
                    variant="outlined"
                  />
                </Box>
                <Box className={classes.inputs}>
                  <TextField
                    id="outlined-required"
                    label="Picture URL"
                    name="pictureUrl"
                    value={pictureUrl}
                    onChange={onChange}
                    variant="outlined"
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Price EUR / h"
                    value={price}
                    name="price"
                    onChange={onChange}
                    variant="outlined"
                    type="number"
                  />
                </Box>
                <Box className={classes.inputs}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel required id="charger-type">
                      Charger
                    </InputLabel>
                    <Select
                      error={errors && !plugin}
                      labelId="charger-type"
                      id="charger-type"
                      label="Charger"
                      name="plugin"
                      value={plugin}
                      onChange={onChange}
                      className={classes.select}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="American_Standard">
                        American Standard
                      </MenuItem>
                      <MenuItem value="Euro_Standard">Euro Standard</MenuItem>
                      <MenuItem value="CHAdeMO">CHAdeMO</MenuItem>
                      <MenuItem value="DB_T">DB T</MenuItem>
                      <MenuItem value="GB_T_DC">GB T DC</MenuItem>
                      <MenuItem value="Tesla_Supercharger">
                        Tesla Supercharger
                      </MenuItem>
                      <MenuItem value="Type1_CSS_Combo1">
                        Type1 CSS Combo1
                      </MenuItem>
                      <MenuItem value="Type1_J1772">Type1 J1772</MenuItem>
                      <MenuItem value="Type2_css_combo2">
                        Type2 css combo2
                      </MenuItem>
                      <MenuItem value="Type2_Mennekes">Type2 Mennekes</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    onClick={getLatLang}
                    startIcon={<MapIcon />}
                  >
                    Find on map
                  </Button>
                </Box>
                <Divider className={classes.divider} />
                <Typography variant="h6">Extras</Typography>
                <FormControlLabel
                  control={
                    <Checkbox name="bike" color="primary" checked={bike} />
                  }
                  label="Bike rent"
                  onChange={onExtrasChange}
                />
                <FormControlLabel
                  control={
                    <Checkbox name="coffee" color="primary" checked={coffee} />
                  }
                  label="Coffee"
                  onChange={onExtrasChange}
                />
                <FormControlLabel
                  control={
                    <Checkbox name="bed" color="primary" checked={bed} />
                  }
                  label="Bed"
                  onChange={onExtrasChange}
                />
                <FormControlLabel
                  control={
                    <Checkbox name="drive" color="primary" checked={drive} />
                  }
                  label="Drive"
                  onChange={onExtrasChange}
                />
                <FormControlLabel
                  control={
                    <Checkbox name="bus" color="primary" checked={bus} />
                  }
                  label="Bus station"
                  onChange={onExtrasChange}
                />
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={5}>
                <AddStationMap />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditStation;
