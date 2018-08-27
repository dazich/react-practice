import App from '../App'

import Home from '../components/HelloWorld'

export default {
    path: '/',
    component: App,
    indexRoute: { component: Home },
    childRoutes: [
        { path: 'home', component: Home },
        // { path: 'inbox',
        //     component: Inbox,
        //     childRoutes: [
        //         { path: '/messages/:id', component: Message },
        //         { path: 'messages/:id',
        //             onEnter: function (nextState, replaceState) {
        //                 replaceState(null, '/messages/' + nextState.params.id)
        //             }
        //         }
        //     ]
        // }
    ]
}