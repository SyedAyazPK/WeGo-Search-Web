import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import clsx from 'clsx';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { toast } from 'react-toastify';

let renderCount = 0;

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  service: yup.string().required('You must enter a value'),
  price: yup.string().required('You must enter a value'),
  message: yup.string().required('You must enter a value'),
});

function VendorPriceQuote({ profile, socket, service }) {
  console.log(' |||| ---- >>>>> ', profile);
  const defaultValues = {
    service: service ? service : 'Unknown Service',
  };

  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues,
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const user = useSelector(selectUser);

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  renderCount += 1;

  const data = watch();

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

  return (
    <div className='flex w-full max-w-screen-md justify-start items-start'>
      <form
        className='w-full'
        onSubmit={handleSubmit((_data) => {
          console.log(
            '🚀 ~ file: VendorPriceQuote.js:72 ~ onSubmit={handleSubmit ~ _data:',
            _data
          );
          const data = {
            _id: user?._id,
            name: user?.name,
            title: 'ABC',
            message: _data.message,
            price: _data.price,
            clientId: profile?._id,
            bid: true,
          };
          console.log(data);
          socket?.emit('bid', {
            // id: generateUIDforList(),
            ...data,
          });
          showToast('Bid generated');
        })}
      >
        <div className='mt-4'>
          <Typography className='font-semibold text-8'>
            <b>Required:</b>
          </Typography>

          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                variant='outlined'
                error={!!errors.required}
                helperText={errors?.required?.message}
                required
                fullWidth
                style={{ backgroundColor: '#EDEDED' }}
              />
            )}
            name='service'
            control={control}
          />
        </div>
        <div className='mt-4'>
          <Typography className='font-semibold text-14'>
            <b>Price:*</b>
          </Typography>

          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                variant='outlined'
                placeholder='Enter your amount'
                error={!!errors.price}
                helperText={errors?.price?.message}
                required
                fullWidth
                style={{ backgroundColor: '#EDEDED' }}
              />
            )}
            name='price'
            control={control}
          />
        </div>
        <div className='mt-4'>
          <Typography className='font-semibold text-14'>
            <b>Send your Message:*</b>
          </Typography>

          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                variant='outlined'
                placeholder='Enter text message'
                error={!!errors.message}
                helperText={errors?.message?.message}
                required
                fullWidth
                style={{ backgroundColor: '#EDEDED' }}
              />
            )}
            name='message'
            control={control}
          />
        </div>

        <div className='flex my-8 items-center justify-center'>
          <Button
            className='mx-8  w-2/3'
            variant='contained'
            color='secondary'
            type='submit'
            disabled={_.isEmpty(dirtyFields) || !isValid}
          >
            <b>Send</b>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default VendorPriceQuote;
