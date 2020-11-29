import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      head: {
        fontWeight: 600,
        fontSize: '1rem',
      },
      body: {
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
