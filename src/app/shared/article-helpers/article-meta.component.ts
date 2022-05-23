import { Component, Input } from '@angular/core';

import { Article } from '../../core';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html'
})
export class ArticleMetaComponent {
  imageNews: string = 'https://image.shutterstock.com/image-vector/news-vector-icon-260nw-682278412.jpg';
  @Input() article: any;
}
