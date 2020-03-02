import {Component, ElementRef, ViewChild} from '@angular/core';

export interface Post {
  title: string
  text: string
  id?: number
  corrected?: string
  like?: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  posts: Post[] = [
    //{title: 'Post number: 3', text: 'This is text third #1 post', id: 3, corrected: '', like: ''},
    //{title: 'Post number: 2', text: 'This is text second #2 post', id: 2, corrected: '', like: ''},
    //{title: 'Post number: 1', text: 'This is text first #3 post', id: 1, corrected: '', like: ''}
  ];

  likePosts: Post[] = [];

  // ===============================Функция добовляющая пост в массив posts
  updatePosts(post: Post){
    console.log(post);
    // Проверка: Если редактирование меняем значения на новые
    if( post.corrected === '( Corected )') {
      this.posts.find(p => p.id === post.id).title = post.title;
      this.posts.find(p => p.id === post.id).text = post.text;
      this.posts.find(p => p.id === post.id).corrected = post.corrected;
    } else {
      // Определяем id для нового поста
      post.id = this.posts.length +1;
      this.posts.unshift(post)
    }
  }


  // ===============================Функция добовляющая пост в массив likePosts
  updateLikesPosts(answer: boolean){
    this.activeLikesPost = answer;
  }
  activeLikesPost: boolean;

  // ===============================Функция обробатывающая событие связаное с onRemovePost
  removePost(id: number){
    // Фильтруем массив posts и остовляем те посты у которых id не совподвем с получаемым id от компонента post.component.ts
    this.posts = this.posts.filter(p => p.id !== id);
    // Фильтруем массив likePosts и остовляем те посты у которых id не совподвем с получаемым id от компонента post.component.ts
    this.likePosts = this.likePosts.filter(p => p.id !== id);
  }


  // ===============================Функция обробатывающая событие связаное с onEditPost
  editPost(post: Post){
    // Записываем в переменную полученный пост от компонента post.component.ts, для будующей отправке в компонент post-form.component.ts
    this.changeEditPost = Object.assign({}, post);

  }
  // Контейнер для отправки поста в post-form.component.ts
  changeEditPost: object;


  // ===============================Функция обробатывающая событие связаное с onLikePost
  likePost(post: Post){
    // удаляем пост из массива likePosts, если таков уже там есть
    if(this.likePosts.find(p => p.id === post.id) === post) {
      this.likePosts = this.likePosts.filter(p => p.id !== post.id)
    }
    // добовляем пост в массив likePosts, если таковых там еще небыло
    else {
      this.likePosts.unshift(post)
    }
  }
}
