import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  buttonAddRule: {
    // viết css vào đây để  icon và text trên cùng 1 dòng
    // // dãn cách button so với ô search
    // boxShadow: theme.boxShadow,
    // borderRadius: theme.shape.borderRadius,
    // background: theme.palette.background.paper,
    margin: '8px 0',
    justifyContent: 'center',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
  },
  ruleItem: {
    boxShadow: theme.boxShadow,
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.background.paper,
    margin: '8px 0',
  },
  center: {
    display: 'block',
    marginLeft: 'center',
    marginRight: 'center',
  },
}));
