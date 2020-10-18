import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('searchicon') searchicon: ElementRef;

  constructor(private renderer: Renderer2,
    private router: Router) {
    this.renderer.listen('window', 'click', (e: Event) => {

      if (e.target !== this.toggleButton.nativeElement && e.target !== this.searchicon.nativeElement) {
        this.input_s = false;
        this.button_s = false;
      }

    })
  }

  urlWeb = '/assets/logo.png';

  ngOnInit(): void {
  }

  searchValue = new FormControl('');
  input_s = false;
  button_s = false;
  berubah() {
    this.input_s = true;
    this.button_s = true;
  }

  vectorSearch;
  goSearch() {
    let method = 'no_method';
    if (this.vectorSearch) {
      method = 'vector_space_model_active';
    }
    this.router.navigate(['/search', this.searchValue.value, 1, method]);
  }

}
