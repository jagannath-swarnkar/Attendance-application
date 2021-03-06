import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Signin() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    email: "",
    password: "",
    login: false
  });

  React.useState(() => {
    ValidatorForm.addValidationRule("isEmpty", value => {
      if (value.length > 0) {
        return true;
      }
      return false;
    });
  }, []);

  const formSubmit = e => {
    e.preventDefault();
    Axios.post("http://localhost:8010/signin", { data: state })
      .then(res => {
        console.log(res.data);
        if (res.data.length > 0 || res.data) {
          reactLocalStorage.set("token", res.data[0]);
          setState({
            ...state,
            email: "",
            password: "",
            login: true
          });
        } else {
          window.alert("Invalid Email Address / Password");
        }
      })
      .catch(err => console.error(err));
  };

  if (state.login || reactLocalStorage.get("token")) {
    return <Redirect to="/home" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <ValidatorForm className={classes.form} onSubmit={formSubmit}>
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={state.email}
            onChange={e => {
              setState({ ...state, email: e.target.value });
            }}
            validators={["isEmpty", "isEmail"]}
            errorMessages={["Please fill in this field", "Email is not valid"]}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={state.password}
            onChange={e => {
              setState({ ...state, password: e.target.value });
            }}
            validators={["isEmpty"]}
            errorMessages={["Please fill in this field"]}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
}
