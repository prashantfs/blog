import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleListConfig, TagsService, UserService } from '../core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  mediaType = '';
  keywordsearch = '';
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService
  ) {}

  isAuthenticated: boolean;
  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };
  tags: Array<string> = [];
  tagsLoaded = false;

  ngOnInit() {

    this.dropdownList = [
      { item_id: 'TwitterPosts', item_text: 'Twitter' },
      { item_id: 'YoutubePosts', item_text: 'Youtube' },
      { item_id: 'TechnicalArticles', item_text: 'Technical Articles' },
      { item_id: 'NewsArticles', item_text: 'News Articles' },
      { item_id: 'BlogArticles', item_text: 'Blog Articles' }
    ];
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      }
    );

    // this.tagsService.getAll()
    // .subscribe(tags => {
    //   this.tags = tags;
    //   this.tagsLoaded = true;
    // });
  }

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Otherwise, set the list object
    this.listConfig = {type: type, filters: filters};
  }

  onItemSelect(item: any) {
    // console.log(item);
    this.mediaType = item.item_text
    // console.log(this.authForm.value) 
  }
  onSelectAll(items: any) {
    // console.log(items);onSelectAll

    // this.keywordsearch.get("keywordsearch").patchValue(items.value)
    this.keywordsearch = items.value
  }
}
