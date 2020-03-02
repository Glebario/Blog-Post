import {Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import {Post} from '../app.component';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnChanges {

  @Output() activeFavoritePosts: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onAdd: EventEmitter<Post> = new EventEmitter<Post>();
  @ViewChild('titleFocus', {static: false}) titleFocus: ElementRef;
  @ViewChild('textFocus', {static: false}) textFocus: ElementRef;
  @ViewChild('favoritePost', {static: false}) favoritePost: ElementRef;
  @Input() editPost: Post;


  Title: string = '';
  Text: string = '';

  addPostBtn: string = 'Add post';

  //====================================Форма создания и отправки поста в post.component.ts
  addPost(){
    if ( this.Title.trim() && this.Text.trim()) {
      // Проверка: добовление нового поста или редактирование старого
      if(this.addPostBtn === 'Edit post'){
        this.addPostBtn = 'Add post';
        const p: Post  = {
          title: this.Title,
          text: this.Text,
          like: this.editPost.like,
          // Если это редактирование поста, то добовляем влаг ( Corected )
          corrected: `( Corected )`,
          id: this.editPost.id
        };
        // Отправка поста
        this.onAdd.emit(p);
      }else {
        const p: Post = {
          title: this.Title,
          text: this.Text,
          like: ''
        };
        // Отправка поста
        this.onAdd.emit(p);
      }
      // Очищаем поля ввода
      this.Title = this.Text = '';
    }
  }

  titleInputFocus(){
    this.titleFocus.nativeElement.focus()
  }

  textInputFocus(){
    this.textFocus.nativeElement.focus()
  }

  favoritePosts(){
    if(this.favoritePost.nativeElement.id) {
      this.favoritePost.nativeElement.removeAttribute('id');
      this.activeFavoritePosts.emit(true);
    } else {
      this.favoritePost.nativeElement.setAttribute('id', 'checkboxLabel');
      this.activeFavoritePosts.emit(false);
    }
  }

  ngOnChanges(changes:SimpleChanges){
    // Выполняем если приходит контейнер editPost от app.component.ts
    this.Title = this.editPost.title;
    this.Text = this.editPost.text;
    this.addPostBtn = 'Edit post';
    console.log('go');
    console.log(changes)
  }


}
