import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { InputFieldProps } from "../../types";

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function Input({ half, name, type, label, handleChange, handlePassword }: InputFieldProps) {

  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus
        type={type}
        InputProps={name === 'password' ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handlePassword}>
                {type === "password" ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        } : null}
      />
    </Grid>
  )
}

export default Input;