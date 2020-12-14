import Login from '../containers/Login';
import Dashboard from '../containers/Dashboard';
import Account from '../containers/Account';
import Rule from '../containers/Rule';
import Admin from '../containers/Admin';
import ClassManager from '../containers/ClassManager';
import Classroom from '../containers/Classroom';


const appRoutes = {
  login: {
    url: '/login',
    component: Login,
    private: false,
  },
  changeinfo: {
    url: '/account',
    component: Account,
    private: true,
  },
  rule: {
    url: '/rules',
    component: Rule,
    private: true,
  },
  dashboard: {
    url: '/dashboard',
    component: Dashboard,
    private: true,
  },
  admin: {
    url: '/admins/accounts',
    component: Admin,
    private: true,
  },
  classmanager:{
    url: '/admins/classes',
    component: ClassManager,
    private: true,
  },
  classroom:{
    url: '/classroom/:classroomId',
    component: Classroom,
    private: true,
  },
};

export default appRoutes;
