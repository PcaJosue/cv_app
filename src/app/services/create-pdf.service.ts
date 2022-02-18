import { Injectable } from '@angular/core';
import { Canvas, ICreatePDF, Line, PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "src/assets/fonts.js";
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { selectPDF } from '../state/manage_language/manage_language.selects';
import { C } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class CreatePdfService {


  public labels;
  private colors: any = {
    gray: '#919190'
  }


  constructor(private store: Store) {
    this.store.select(selectPDF).subscribe(labels => {
      this.labels = labels;
    })
    PdfMakeWrapper.setFonts(pdfFonts, {
      icons: {
        normal: 'fontello.ttf',
        bold: 'fontello.ttf',
        italics: 'fontello.ttf',
        bolditalics: 'fontello.ttf'
      },
      roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Bold.ttf',
        italics: 'Roboto-ThingItalic.ttf',
        bolditalics: 'Robo-BoldItalic.ttf'
      }
    });
    PdfMakeWrapper.useFont('roboto')
  }

  createPdf(data: any): ICreatePDF {

    const labels = this.labels.international;
    const pdf = new PdfMakeWrapper();
    const personalInfo = [];
    const links = [];

    pdf.pageSize('A4');
    this.setStyles(pdf);
    pdf.add({ text: `${_.upperCase(labels.title)} - ${_.capitalize(data.personal.firstName)} ${_.capitalize(data.personal.lastName)}`, style: 'header' })

    pdf.add({
      columns: [
        { text: _.capitalize(data.personal.ocupation), style: 'subheader', color: this.colors.gray, alignment: 'left' },
        { text: `${_.capitalize(data.personal.state)} - ${_.capitalize(data.personal.country)}`, color: this.colors.gray, alignment: 'right' }
      ]
    })


    pdf.add({ margin: [0, 10, 0, 10], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 2 }] });

    personalInfo.push({ text: [{ text: '', style: 'icons' }, ' ', { text: data.personal.phone }] })
    personalInfo.push({ text: [{ text: '', style: 'icons' }, ' ', { text: data.personal.email, link: `mailto:${data.personal.email}` }] })
    if (data.personal.networks.other) personalInfo.push({ text: [{ text: '', style: 'icons' }, ' ', { text: data.personal.networks.other, link: data.personal.networks.other }] })


    if (data.personal.networks.github) links.push({ text: '', style: 'icons', link: data.personal.networks.github })
    if (data.personal.networks.linkedin) links.push({ text: '', style: 'icons', link: data.personal.networks.linkedin })
    if (data.personal.networks.instagram) links.push({ text: '', style: 'icons', link: data.personal.networks.instagram })
    if (data.personal.networks.facebook) links.push({ text: '', style: 'icons', link: data.personal.networks.facebook })
    if (data.personal.networks.twitter) links.push({ text: '', style: 'icons', link: data.personal.networks.twitter })

    pdf.add({
      columns: [
        { stack: personalInfo },
        { text: links, alignment: 'right', fontSize: 20 }
      ],
      margin: [0, 0, 0, 15]
    })

    if (data.objective) {
      pdf.add({
        text: data.objective, style: 'description',
        margin: [0, 0, 0, 15]
      })
    }

    if (data.laboral.length > 0) {

      pdf.add({ text: `${_.startCase(labels.laboral)}`, style: 'header' })
      pdf.add({ margin: [0, 5, 0, 15], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 2 }] });

      const laboralInformation = data.laboral.map(laboral => {

        const information = [];
        information.push({
          text: [
            { text: _.capitalize(laboral.job), style: 'subheader' },
            { text: `   ( ${_.capitalize(laboral.employer)} )`, color: this.colors.gray, alignment: 'right' }

          ], margin: [0, 0, 0, 3]
        })
        information.push({
          columns: [
            { text: `${laboral.startDate} - ${laboral.endDate ? laboral.endDate : 'today'}`, color: this.colors.gray },
            { text: ` ${_.capitalize(laboral.city)} : ${_.capitalize(laboral.country)}`, color: this.colors.gray, alignment: 'right' }
          ], margin: [0, 0, 0, 3]
        })
        information.push({ text: laboral.functions ? laboral.functions : '', margin: [0, 0, 0, 3], style: 'description' })
        return { stack: information, margin: [0, 0, 0, 5] }
      })

      pdf.add({
        stack: laboralInformation,
        margin: [0, 0, 0, 15]
      })

    }

    if (data.academic.length > 0) {

      pdf.add({ text: `${_.startCase(labels.academic)}`, style: 'header' })
      pdf.add({ margin: [0, 5, 0, 15], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 2 }] });

      const academicInformation = data.academic.map(academic => {

        const information = [];
        information.push({ text: _.capitalize(academic.career), style: 'subheader', margin: [0, 0, 0, 3] });
        information.push({ text: `${_.capitalize(academic.school)}`, color: this.colors.gray, margin: [0, 0, 0, 3] });
        information.push({
          columns: [
            { text: `${academic.startDate} - ${academic.endDate ? academic.endDate : 'today'}`, color: this.colors.gray },
            { text: ` ${_.capitalize(academic.location)}`, color: this.colors.gray, alignment: 'right' }
          ], margin: [0, 0, 0, 3]
        })
        return { stack: information, margin: [0, 0, 0, 5] }
      })

      pdf.add({
        stack: academicInformation,
        margin: [0, 0, 0, 15]
      })

    }

    if (data.skill.length > 0) {
      pdf.add({ text: `Skills`, style: 'header' })
      pdf.add({ margin: [0, 5, 0, 15], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 2 }] });


      const skillInformation = data.skill.map((skill) => {

        const information = [];
        information.push({
          text: [
            { text: _.capitalize(skill.name), margin: [0, 0, 0, 3] },
            ' ',
            { text: `( ${_.lowerCase(skill.level)} )`, color: this.colors.gray, margin: [0, 0, 0, 3] },
            ' '
          ]
        })

        return { text: information, margin: [0, 0, 0, 5] }
      })

      pdf.add({
        text: skillInformation,
        margin: [0, 0, 0, 15]
      })

    }

    if (data.language.length > 0) {
      pdf.add({ text: `${_.startCase(labels.language)}`, style: 'header' })
      pdf.add({ margin: [0, 5, 0, 15], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 2 }] });

      const languageInformation = data.language.map(language => {

        const information = [];
        information.push({
          text: [
            { text: _.capitalize(language.name), margin: [0, 0, 0, 3] },
            ' ',
            { text: `( ${_.lowerCase(language.level)} )`, color: this.colors.gray, margin: [0, 0, 0, 3] },
            ' '
          ]
        })

        return { text: information, margin: [0, 0, 0, 5] }
      })

      pdf.add({
        text: languageInformation,
        margin: [0, 0, 0, 15]
      })

    }


    if (data.achievement.length > 0) {

      pdf.add({ text: `${_.startCase(labels.achievement)}`, style: 'header' })
      pdf.add({ margin: [0, 5, 0, 15], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 2 }] });

      const achievementInformation = data.achievement.map(achievement => {

        const information = [];
        information.push({
          text: [
            { text: _.capitalize(achievement.name), style: 'subheader', margin: [0, 0, 0, 3] },
            ' ',
            { text: `( ${_.lowerCase(achievement.date)} )`, color: this.colors.gray, margin: [0, 0, 0, 3] }
          ]
        })
        if (achievement.description) information.push({ text: achievement.description, style: 'description', margin: [0, 0, 0, 3] })

        return { stack: information, margin: [0, 0, 0, 5] }
      })

      pdf.add({
        stack: achievementInformation,
        margin: [0, 0, 0, 15]
      })

    }

    if (data.certification.length > 0) {

      pdf.add({ text: `${_.startCase(labels.certification)}`, style: 'header' })
      pdf.add({ margin: [0, 5, 0, 15], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 2 }] });

      const certificationInformation = data.certification.map(certification => {

        const information = [];
        information.push({
          text: [
            { text: _.capitalize(certification.name), style: 'subheader', margin: [0, 0, 0, 3] },
            ' ',
            { text: `( ${_.lowerCase(certification.school)} - ${certification.date ? certification.date : ''} )`, color: this.colors.gray, margin: [0, 0, 0, 3] },
          ]
        })

        return { stack: information, margin: [0, 0, 0, 5] }
      })

      pdf.add({
        stack: certificationInformation,
        margin: [0, 0, 0, 15]
      })

    }

    if (data.interest.length > 0) {
      pdf.add({ text: `${_.startCase(labels.interest)}`, style: 'header' })
      pdf.add({ margin: [0, 5, 0, 15], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 2 }] });

      const interestInformation = data.interest.map((interest, index) => {
        const information = [];
        information.push({ text: [interest.name, ` ${index === (data.interest.length - 1) ? ' ' : ', '} `], style: 'description' })
        return { text: information, margin: [0, 0, 0, 5] };
      });

      pdf.add({
        text: interestInformation,
        margin: [0, 0, 0, 15]
      })

    }

    console.log('pdf', pdf.getDefinition());
    console.log('pdf', pdf);

    return pdf.create();
  }

  setStyles(pdf) {
    pdf.defaultStyle({
      bold: false,
      fontSize: 14
    });

    pdf.styles({
      header: {
        fontSize: 22,
        bold: true
      },
      subheader: {
        fontSize: 18,
        bold: true
      },
      icons: {
        font: 'icons'
      },
      description: {
        fontSize: 12
      }
    });
  }
}


//  .icon-mail:before { content: '\e800'; } /* '' */
// .icon - mobile:before { content: '\e801'; } /* '' */
// .icon - website:before { content: '\e802'; } /* '' */
// .icon - twitter:before { content: '\f099'; } /* '' */
// .icon - github - circled:before { content: '\f09b'; } /* '' */
// .icon - instagram:before { content: '\f16d'; } /* '' */
// .icon - whatsapp:before { content: '\f232'; } /* '' */
// .icon - linkedin - squared:before { content: '\f30c'; } /* '' */
// .icon - facebook - circled:before { content: '\f30d'; } /* '' */