import * as React from 'react';
import Snackbar from '@mui/joy/Snackbar';
import Alert from '@mui/joy/Alert';
import AspectRatio from '@mui/joy/AspectRatio';
import IconButton from '@mui/joy/IconButton';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';

export default function SnackbarComponent() {
  const [open, setOpen] = React.useState(true);
  const [duration, setDuration] = React.useState(7000);
  const [left, setLeft] = React.useState(undefined);
  const timer = React.useRef(undefined);
  const countdown = () => {
    timer.current = setInterval(() => {
      setLeft((prev) => (prev === undefined ? prev : Math.max(0, prev - 100)));
    }, 100);
  };
  React.useEffect(() => {
    setDuration(7000)
    if (open && duration !== undefined && duration > 0) {
      setLeft(duration);
      countdown();
    } else {
      window.clearInterval(timer.current);
    }
  }, [open, duration]);
  const handlePause = () => {
    window.clearInterval(timer.current);
  };
  const handleResume = () => {
    countdown();
  };
  return (
    <div>
      <Snackbar
        autoHideDuration={duration}
        resumeHideDuration={left}
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onFocus={handlePause}
        onBlur={handleResume}
        onUnmount={() => setLeft(undefined)}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          padding: 0,
        }}
      >
        <Alert
          size="lg"
          color="success"
          variant="solid"
          invertedColors
          startDecorator={
            <AspectRatio
              variant="solid"
              ratio="1"
              sx={{
                minWidth: 40,
                borderRadius: '50%',
                boxShadow: '0 2px 12px 0 rgb(0 0 0/0.2)',
              }}
            >
              <div>
                <Check fontSize="xl2" />
              </div>
            </AspectRatio>
          }
          endDecorator={
            <IconButton
              variant="plain"
              sx={{
                '--IconButton-size': '32px',
                transform: 'translate(0.5rem, -0.5rem)',
              }}
            >
              <Close />
            </IconButton>
          }
          sx={{ alignItems: 'flex-start', overflow: 'hidden' }}
        >
          <div>
            <Typography level="title-lg">Success</Typography>
            <Typography level="body-sm">
              Success is walking from failure to failure with no loss of enthusiam.
            </Typography>
          </div>
          <LinearProgress
            variant="solid"
            color="success"
            value={40}
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
            }}
          />
        </Alert>
      </Snackbar>
    </div>
  );
}
