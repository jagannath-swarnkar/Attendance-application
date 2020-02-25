import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const [isDone, setIsDone] = React.useState(false);
  const [state, setState] = React.useState({
    firstname: "",
    lastname: "",
    category: "",
    email: "",
    password: ""
  });

  React.useState(() => {
    ValidatorForm.addValidationRule("isStrongPass", value => {
      let s_char = value
        .split("")
        .find(el => "!@#$%&|*~".split("").includes(el));
      if (value.length > 8 && s_char !== undefined) {
        return true;
      }
      return false;
    });
    ValidatorForm.addValidationRule("isEmpty", value => {
      if (value.length > 0) {
        return true;
      }
      return false;
    });
    ValidatorForm.addValidationRule("isV", value => {
      if (["student", "teacher"].includes(value)) {
        return true;
      }
      return false;
    });
  }, []);

  const formSubmit = e => {
    e.preventDefault();
    Axios.post("http://localhost:8010/signup", { data: state })
      .then(res => {
        window.alert("Signup successful! :) \nClick on OK button to for login");
        setState({
          ...state,
          firstname: "",
          lastname: "",
          category: "",
          email: "",
          password: ""
        });
        setIsDone(true);
      })
      .catch(err => console.error(err));
  };

  if (isDone) {
    return <Redirect to="/signin" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <ValidatorForm className={classes.form} onSubmit={formSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={state.firstname}
                onChange={e => {
                  setState({ ...state, firstname: e.target.value });
                }}
                validators={["isEmpty"]}
                errorMessages={["Please fill in this field"]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastname"
                value={state.lastname}
                onChange={e => {
                  setState({ ...state, lastname: e.target.value });
                }}
                validators={["isEmpty"]}
                errorMessages={["Please fill in this field"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="category"
                label="Teacher / Student"
                name="category"
                autoComplete="category"
                placeholder="teacher / student"
                value={state.category}
                onChange={e => {
                  setState({ ...state, category: e.target.value });
                }}
                validators={["isEmpty", "isV"]}
                errorMessages={[
                  "Please fill in this field",
                  "student / teacher"
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={state.email}
                onChange={e => {
                  setState({ ...state, email: e.target.value });
                }}
                validators={["isEmpty", "isEmail"]}
                errorMessages={[
                  "Please fill in this field",
                  "Email is not valid"
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
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
                validators={["isEmpty", "isStrongPass"]}
                errorMessages={[
                  "Please fill in this field",
                  "min 8 chars & one special character"
                ]}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
}
