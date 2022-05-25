import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleListConfig, ArticlesService, TagsService, UserService } from '../core';

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
    private userService: UserService,
    private articlesService: ArticlesService
  ) {}

  isAuthenticated: boolean;
  listConfig: ArticleListConfig = {
    type: 'all',
    searchQuery: '',
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
    this.mediaType = item.item_id
    // this.retrieveGetKeywordSuggestion()
    // console.log(this.authForm.value) 
    // console.log(this.mediaType)
    // if(this.keywordsearch && this.keywordsearch.length > 3) {
    //   this.listConfig = {type: this.mediaType, filters: {}, searchQuery: this.keywordsearch};
    // } else {
    //   this.listConfig = {type: this.mediaType, filters: {}};
    // }
  }
  onSelectAll() {
    // console.log(items);onSelectAll
    console.log(this.keywordsearch)
    // this.keywordsearch.get("keywordsearch").patchValue(items.value)
    // this.keywordsearch = items.value
    // console.log(this.keywordsearch)
  }

  search() {
    if(this.keywordsearch) {
      this.listConfig = {type: this.mediaType, filters: {}, searchQuery: this.keywordsearch};
    } else {
      this.listConfig = {type: this.mediaType, filters: {}};
    }
    this.retrieveGetKeywordSuggestion()
  }


  retrieveGetKeywordSuggestion() {
    let tempData = {type: this.mediaType, searchQuery: this.keywordsearch}
    this.articlesService.get(tempData)
    .subscribe(data => {
      console.log(data)
      if(data && data.data && data.data[0] && data.data[0].Suggestions) {
        this.tags = data.data[0].Suggestions;
        this.tagsLoaded = true;
      }
      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      // this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
    });
  }

  selectKeyword(keyword) {
    this.keywordsearch = keyword
    this.search()
  }
}
