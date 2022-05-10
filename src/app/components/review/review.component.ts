import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CreatePdfService } from 'src/app/services/create-pdf.service';
import { selectReview } from 'src/app/state/manage_language/manage_language.selects';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  formats;
  format: FormControl = new FormControl()
  information: any;
  pdf: any;
  pdfSrc: any = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  labels$ = this.store.select(selectReview)
  name: string;



  constructor(private store: Store, private router: Router, private pdfService: CreatePdfService) { }

  ngOnInit(): void {

    this.store.subscribe((data: any) => {
      this.formats = data.manage_language.labels.formats
      this.format.setValue(this.formats[1])
      this.information = { ...data }
      this.information.languageCode = this.information.manage_language.language;
      delete this.information.manage_language;
      this.createPdf(this.format.value, this.information)
      this.name = `${this.information.personal.firstName}_${this.information.personal.lastName} `

    })

    this.format.valueChanges.subscribe(format => {
      this.createPdf(format, this.information)
    })

  }

  async createPdf(format, data) {

    if (this.formats[0] === format) {
      this.pdf = await this.pdfService.createPdf(data);

    } else if (this.formats[1] === format) {
      this.pdf = await this.pdfService.createCoolPdf(data);
    }


    this.pdf.getDataUrl((url) => {
      this.pdfSrc = url
    })
  }

  async download() {
    if (this.formats[0] === this.format.value) {
      this.pdf = await this.pdfService.createPdf(this.information).download(`${this.name ? this.name : ''}_${new Date().getTime().toString()}.pdf`);;

    } else if (this.formats[1] === this.format.value) {
      this.pdf = await this.pdfService.createCoolPdf(this.information);
      this.pdf.download(`${this.name ? this.name : ''}_${new Date().getTime().toString()}.pdf`);;
    }

  }


  goTo(step) {
    if (step === 'back') this.router.navigate(['create', 'objective']);
  }

  exportData() {

    const data = JSON.stringify(this.information);
    const blob = new Blob([data], { type: 'text/json' });
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = `cv_${new Date().getTime()}_${this.information.personal?.firstName}.json`;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);

  }
}
