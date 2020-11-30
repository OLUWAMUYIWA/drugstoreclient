import {store} from '../store'
import PageIndex from '../pages/Index';
import UserRegForm from '../pages/UserRegForm';
import SeniorRegForm from '../pages/SeniorRegForm';
import Search from '../pages/Search';
import SearchResults from '../pages/SearchResults';
import UserLay from '../layouts/UserLay';
import ContributorLayout from '../layouts/ContributorLayout';
import MyDrugs from '../pages/MyDrugs';
import UploadManyDrugs from '../pages/UploadManyDrugs';
import BossLayout from '../layouts/BossLayout';
import BossHome from '../pages/BossHome';
import UnverifiedJuns from '../pages/UnverifiedJuns';
import UnverifiedSens from '../pages/UnverifiedSens' ;



const ifAuthenticated = (to, from, next) => {
  let u = JSON.parse(localStorage.getItem("user"))
  if (u) {
    if (u.accessToken !== "") {
    next();
    return;
    }
    else {
      next('/login');
    return;
    }
  }
  
  next("/login");
};


const ifBoss = (to,from, next) => {
  let u = JSON.parse(localStorage.getItem("user"))
  if (u) {
     if (u.role === 'boss') {
    next();
    return;
    }
    else if (u.role === 'senior') {
      next("/contributor")
      return
    }
    else {
      next("/user/search")
      return
    }
  }
   
  next("/login");
}

const ifContributor = (to,from, next) => {
  let u = JSON.parse(localStorage.getItem("user"))
  if (u)
  {
  if (u.role === 'boss' || u.role === 'senior') {
    next();
    return;
  }
  else {
    next('/user/search')
    return
  }
  }
  
  next("/login");
  
}

const routes = [
    {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { 
          path: '', 
          name: 'Home',
          component: PageIndex,
        },
        {
          path: 'register_user', 
          name: 'UserReg',
          component: UserRegForm,
        },
        {
          path: 'register_contributor', 
          name: 'ContributorReg',
          component: SeniorRegForm
        },
        {
          path: 'login', 
          name : 'Login',
          component: ()=> import('pages/LoginForm.vue'),
        }

      ],
      //beforeEnter: ifLoadedOnce
    },
     {
    path: '/boss',
    component: BossLayout,
    children: [
      {
        path: '',
        name: 'BossHome',
        component: BossHome,
      },
      {
        path: 'sendUnverifiedJuns', 
        name: 'SendUnverifiedJuns',
        component: UnverifiedJuns,
    },
      {
        path: 'sendUnverifiedSens', 
        name: 'SendUnverifiedSens',
        component: UnverifiedSens,
    }
    ],
    beforeEnter: ifBoss
   
  },

    {
    path: '/user',
      component: UserLay,
      children: 
      [
        {
          path: 'search', 
          name: 'Search',
          component: Search,
        },
        {
          path: 'search/:query', 
          name: 'SearchResults',
          component: SearchResults,
        }
      ],
      beforeEnter: ifAuthenticated
    
    },
    {
    path: '/contributor',
    component: ContributorLayout,
    children: [
      {
        path: '',
        name: '/MyDrugs',
        component: MyDrugs,
      },
    
      {
        path:'uploadManyDrugs',
        name: 'UploadMany',
        component: UploadManyDrugs,
      }
    ],
    beforeEnter: ifContributor
  },

  
    
    {
      path: '*',
      component: () => import('pages/Error404.vue')
    }
]
export default routes

