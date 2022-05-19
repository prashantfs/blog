import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService } from '../core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = 'Add Keywords';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'keywordsearch': ['', Validators.required],
      'media': ['', Validators.required]
    });
  }

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

    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      // this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};
      const credentials = this.authForm.value;
      this.userService
      .attemptAuth(this.authForm.value)
      .subscribe(
        data => {
          // console.log(data)
          this.router.navigateByUrl('/')
        },
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
  }
  onItemSelect(item: any) {
    // console.log(item);
    this.authForm.get("media").patchValue(item.item_id)
    // console.log(this.authForm.value) 
  }
  onSelectAll(items: any) {
    // console.log(items);onSelectAll

    this.authForm.get("keywordsearch").patchValue(items.value)
  }
}
