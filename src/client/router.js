import Blog from './Blog.vue';
import newBlog from './newBlog.vue';
import Game from './Game.vue';
import Home from './App.vue';
import Css from './Css.vue';

export default [
  {path: '/', component: Home},
  {path: '/newblog', component: newBlog},
  {path: '/blog', component: Blog},
  {path: '/game', component: Game},
  {path: '/css', component: Css}
]