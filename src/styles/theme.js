import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      head: {
        padding: '.5rem 1rem .5rem 1rem',
        fontWeight: 600,
        fontSize: '1rem',
      },
      body: {
        padding: '.5rem 1rem .5rem 1rem',
        fontSize: '.9rem',
      },
    },
  },
  typography: {
    fontFamily: ['Source Sans Pro'],
  },
  palette: {
    primary: {
      main: '#373d41',
    },
  },
});

export default theme;
