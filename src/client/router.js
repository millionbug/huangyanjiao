import Blog from './Blog.vue';
import newBlog from './newBlog.vue';
import blogContent from './blogContent.vue';
import Game from './Game.vue';
import Home from './App.vue';
import Css from './Css.vue';
import WebsocketDemo from './WebsocketDemo.vue';

export default [
  {path: '/', component: Home},
  {
    path: '/newblog',
    component: newBlog,
    children: [
      {path: ':category', component: blogContent},
      {path: ':category/:value', component: blogContent}
    ]
  },
  {path: '/blog', component: Blog},
  {path: '/game', component: Game},
  {path: '/css', component: Css},
  {path: '/wsdemowhynot', component: WebsocketDemo} //为什么websocketdemo作路由不可以
]
