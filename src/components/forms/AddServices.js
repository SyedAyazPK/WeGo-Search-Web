import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, ClickAwayListener } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getServices,
  selectServices,
  selectUser,
  selectUserServices,
  updateUser,
} from '../../features/userSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, serviceName, theme) {
  return {
    fontWeight:
      serviceName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddServices() {
  const theme = useTheme();
  const [serviceName, setserviceName] = React.useState([]);
  const services = useSelector(selectUserServices);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setserviceName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  function showToast(msg) {
    return toast(msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      toastId: 'success',
    });
  }

  const handleClickAway = () => {
    const params = { id: user._id, services: serviceName };
    dispatch(updateUser(params)).then(() => showToast('Service Added'));
    setserviceName([]);
  };

  useEffect(() => {
    dispatch(getServices());
  }, []);

  return (
    <div className='flex items-center'>
      <FormControl sx={{ width: 500 }}>
        <InputLabel id='demo-multiple-name-label'>Services</InputLabel>
        <Select
          labelId='demo-multiple-name-label'
          id='demo-multiple-name'
          multiple
          value={serviceName}
          onChange={handleChange}
          input={<OutlinedInput label='Services' />}
          MenuProps={MenuProps}
        >
          {services?.map((service) => (
            <MenuItem
              key={service._id}
              value={service.service}
              style={getStyles(service, serviceName, theme)}
            >
              {service.service}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className='flex w-50 items-center justify-center my-4 ml-4'></div>
      <Button
        variant='contained'
        color='success'
        onClick={() => handleClickAway()}
        disabled={serviceName.length < 1}
      >
        Update Services
      </Button>
    </div>
  );
}
