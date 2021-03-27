import React, { Ref, useImperativeHandle, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// TODO: extend API for description & actions

export interface IDialogFormDialogProps {
  children?: React.ReactNode;
  onSuccess?: (inputValue: string | undefined) => any;
}

export interface IDialogFormDialogRef {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const FormDialog = React.forwardRef(
  (props: IDialogFormDialogProps, ref: Ref<IDialogFormDialogRef>) => {
    const [isOpen, setOpen] = React.useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const open = () => setOpen(true);
    const close = () => setOpen(false);
    const toggle = () => setOpen(!isOpen);

    useImperativeHandle(ref, () => ({
      open,
      close,
      toggle,
    }));

    return (
      <div>
        {props.children}
        <Dialog
          open={isOpen}
          onClose={close}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Add a friend</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter friend&apos;s email</DialogContentText>
            <TextField
              inputRef={inputRef}
              autoFocus
              margin='dense'
              id='name'
              label='Email Address'
              type='email'
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={close} color='primary'>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (props.onSuccess) props.onSuccess(inputRef.current?.value);
                close();
              }}
              color='primary'
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
);
FormDialog.displayName = 'FormDialog';

export default FormDialog;
