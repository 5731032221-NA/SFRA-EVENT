import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

    {
        title: 'Dashboard',
        icon: 'home-outline',
        children: [
            {
                title: 'Daily Dashboard',
                link: '/pages/dashboard/daily',
            },
            {
                title: 'Historical Dashboard',
                link: '/pages/dashboard/historical',
            }, {
                title: 'Export',
                link: '/pages/dashboard/export',
            }

        ],
    },

    {
        title: 'Employee',
        icon: 'people-outline',
        children: [
            {
                title: 'Employee Info',
                // icon: 'clipboard-outline',
                link: '/pages/tables/table',
            },
            // {
            //   title: 'Smart Table2',
            //   link: '/pages/tables/smart-table2',
            // },
            {
                title: 'Add New Employee',
                // icon: 'person-add-outline',
                link: '/pages/tables/insert',
            }
            ,
            // {
            //   title: 'Tree Grid',
            //   link: '/pages/tables/tree-grid2',
            // },
        ],
    },
    {
        title: 'Face Detection',
        icon: 'video-outline',
        children: [
            {
                title: 'Training',
                // icon: 'clipboard-outline',
                link: '/pages/facedetection/info',
            },
           
        ],
    },
    {
        title: 'Settings',
        icon: 'settings-2-outline',
        children: [
            {
                title: 'Account Management',
                link: '/pages/settings/accountmanagement',
            },
            {
                title: 'Notification',
                link: '/pages/settings/notification',
            }
            // {
            //   title: 'DailyMock',
            //   link: '/pages/dashboard/dailymock',
            // }
        ],
    },
    {
        title: 'Logout',
        icon: 'log-out-outline',


        link: '/pages/auth/logout',
        
    },

];
