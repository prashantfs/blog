import { Component, Input } from '@angular/core';

import { Article, ArticleListConfig, ArticlesService } from '../../core';
@Component({
  selector: 'app-article-list',
  styleUrls: ['article-list.component.css'],
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  mediaType = '';
  keywordsearch = '';
  constructor (
    private articlesService: ArticlesService
  ) {}

  @Input() limit: number;
  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  ngOnInit(){

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
  }

  query: ArticleListConfig;
  results: Article[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset =  (this.limit * (this.currentPage - 1));
    }

    this.articlesService.query(this.query)
    .subscribe(data => {
      this.loading = false;
      this.results = data;

      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      // this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
    });
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
