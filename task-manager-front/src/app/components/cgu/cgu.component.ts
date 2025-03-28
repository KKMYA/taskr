import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cgu',
  standalone: true,
  templateUrl: './cgu.component.html',
  styleUrls: ['./cgu.component.scss'],
  imports: [CommonModule, HttpClientModule]
})
export class CguComponent implements OnInit {
  cguContent: SafeHtml = '';

  constructor(
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    try {
      const markdown = await firstValueFrom(
        this.http.get('/md/cgu.md', { responseType: 'text' })
      );
      const html = await marked(markdown);
      this.cguContent = this.sanitizer.bypassSecurityTrustHtml(html);
    } catch (error) {
      console.error('Erreur lors du chargement des CGU :', error);
    }
  }
}