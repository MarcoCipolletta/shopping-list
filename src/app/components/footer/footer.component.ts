import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @ViewChild('footer', { static: true }) footer!: ElementRef<HTMLElement>;

  constructor() {}

  ngAfterViewInit() {
    this.updateFooterHeight();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateFooterHeight();
  }

  private updateFooterHeight() {
    const height = this.footer.nativeElement.offsetHeight;
    console.log(height);
    document.documentElement.style.setProperty(
      '--footer-height',
      `${height + 18}px`
    );
  }
}
