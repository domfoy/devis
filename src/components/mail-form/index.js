import {useState} from 'react';

import {useForm, Controller} from "react-hook-form";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

function serialize(obj, prefix) {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

function sendRequest(payload) {
  const request = new Request(
    '/wp-admin/admin-ajax.php?action=devis_send_quote_mail',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: serialize(payload)
    }
  );

  return fetch(request);
}

function MainForm(props) {
  const {
    control,
    handleSubmit,
    formState
  } = useForm();

  function onSubmit(data) {
    const payload = {
      nom: data.Nom,
      email: data.Email,
      sections: props.lineSections
    }
    console.log(payload);

    return sendRequest(payload);
  }

  return (
    <form
      style={{
        padding: 16
      }}

      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Controller
          name="Nom"
          control={control}
          rules={{
            validate: value => !!value || 'Nom obligatoire'
          }}
          render={(
            {
              field,
              fieldState
            }
          ) => <TextField
            {...field}
            onChange={field.onChange}
            error={!!fieldState.error}
            inputRef={field.ref}
            helperText={fieldState.error ? fieldState.error.message : null}
            label={field.name}
            required={true}
          />}
        />
        <Controller
          name="Email"
          control={control}
          rules={{
            validate: value => {
              const isValid = /^[^@]+@[^@]+$/.test(value);

              return isValid || 'L\'email doit être valide';
            }
          }}
          render={(
            {
              field,
              fieldState,
              formState
            }
          ) => <TextField
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : null}
            inputRef={field.ref}
            label={field.name}
            onBlur={field.onBlur}
            onChange={field.onChange}
            ref={field.ref}
            required={true}
          />}
        />
      </div>
      {props.render({
        formState,
        onSubmit: handleSubmit(onSubmit)
      })}
    </form>
  );
}

function DialogContainer(props) {
  const [isOpen, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = (fn) => async () => {
    if (fn) {
      await fn();
    }
    setOpen(false);
  };

  return (
    <div>
      <Button
        color="primary"
        onClick={handleClickOpen}
        variant="outlined"
      >
        Envoyer Devis
      </Button>
      <Dialog
        aria-labelledby="form-dialog-title"
        onClose={handleClose()}
        open={isOpen}
      >
        <DialogTitle
          id="form-dialog-title"
        >
          Envoyer le devis
        </DialogTitle>
        <MainForm
          lineSections={props.lineSections}
          render={({formState}) => {
            const handleValidate = () => {
              if (formState.isValid) {
                return handleClose();
              }
            };

            return (
              <DialogActions>
                <Button onClick={handleClose()} color="primary">
                  Annuler
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  onClick={handleValidate()}
                >
                  Valider
                </Button>
              </DialogActions>
            )
          }}
        >
        </MainForm>

      </Dialog>
    </div>
  );
}

export default DialogContainer;
