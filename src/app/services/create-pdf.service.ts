import { Injectable } from '@angular/core';
import { Canvas, Ellipse, ICreatePDF, Img, Line, PdfMakeWrapper, Polyline, Rect, Stack } from 'pdfmake-wrapper';
import pdfFonts from "src/assets/fonts.js";
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { selectPDF } from '../state/manage_language/manage_language.selects';


const MAX_HEIGHT = 840;
const MAX_WIDTH = 594;
const profile = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

@Injectable({
  providedIn: 'root'
})
export class CreatePdfService {


  public labels;
  private colors: any = {
    gray: '#919190',
    primary: '#fff',
    secondary: '#0335fc',
    circle: '#db34eb',
    disabled: '#cfcfcf'
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


  getImage() {
    return new Promise((resolve, reject) => {

      let circleCanvas: HTMLCanvasElement = document.createElement('canvas')
      let circleCtx: CanvasRenderingContext2D = circleCanvas.getContext('2d')
      const img = new Image(130, 130);

      img.crossOrigin = "anonymous"
      img.onload = () => {
        circleCanvas.width = MAX_HEIGHT;
        circleCanvas.height = MAX_WIDTH;

        // draw image with circle shape clip
        circleCtx.save()
        circleCtx.beginPath()
        circleCtx.arc((MAX_WIDTH / 6), 120, 65, 0, Math.PI * 2, true)
        circleCtx.closePath();
        circleCtx.clip()
        circleCtx.drawImage(img, (MAX_WIDTH / 6) - 65, 120 - 65, 130, 130);

        circleCtx.restore();
        resolve(circleCanvas.toDataURL())
      }
      img.src = profile;

    })
  }

  async createCoolPdf(data: any) {

    const labels = this.labels.international;
    const languageLevels = [...Array(7).keys()]
    const skillLevels = [...Array(5).keys()]
    const personalData = [];
    const languageData = [];
    const skillData = [];
    const interestData = [];

    try {
      const circleCanvas: any = await this.getImage();

      const pdf = new PdfMakeWrapper();
      pdf.pageSize('A4');
      this.setStyles(pdf);

      let img = await new Img(circleCanvas).absolutePosition(0, 0).build();

      const rect = new Rect([0, 0], [MAX_WIDTH / 3, MAX_HEIGHT]).color(this.colors.primary).end;
      const polyline = new Polyline([
        { x: 0, y: 0 },
        { x: MAX_WIDTH / 3, y: 0 },
        { x: MAX_WIDTH / 3, y: 120 },
        { x: MAX_WIDTH / 6, y: 150 },
        { x: 0, y: 120 },
      ]).color(this.colors.secondary).end
      const ellipse = new Ellipse([MAX_WIDTH / 6, 120], 70).color(this.colors.circle).end;

      pdf.background({
        canvas: [
          rect
        ]
      })

      console.log('data', data);

      if (data.personal) {
        const personal = data.personal;
        personalData.push({ text: 'Personal Data', style: 'title' });
        personalData.push({ margin: [0, 0, 0, 10], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 175, y2: 0, lineWidth: 1, lineColor: this.colors.secondary }] });
        personalData.push({ text: personal.ocupation, alignment: 'center', bold: true });
        personalData.push({ text: [{ text: '', style: 'icons' }, '   ', `${personal.firstName} ${personal.lastName}`] });
        personalData.push({ text: [{ text: '', style: 'icons' }, '   ', `${personal.email}`] });
        personalData.push({ text: [{ text: '', style: 'icons' }, '   ', `${personal.phone}`] });

        if (personal.networks.other) personalData.push({ text: [{ text: '', style: 'icons' }, '   ', { text: personal.networks.other, link: personal.networks.other, style: 'link' }] });
        if (personal.networks.linkedin) personalData.push({ text: [{ text: '', style: 'icons' }, '   ', { text: personal.networks.linkedin, link: personal.networks.linkedin, style: 'link' }] });
        if (personal.networks.github) personalData.push({ text: [{ text: '', style: 'icons' }, '   ', { text: personal.networks.github, link: personal.networks.github, style: 'link' }] });
        if (personal.networks.instagram) personalData.push({ text: [{ text: '', style: 'icons' }, '   ', { text: personal.networks.instagram, link: personal.networks.instagram, style: 'link' }] });
        if (personal.networks.twitter) personalData.push({ text: [{ text: '', style: 'icons' }, '   ', { text: personal.networks.twitter, link: personal.networks.twitter, style: 'link' }] });
        if (personal.networks.facebook) personalData.push({ text: [{ text: '', style: 'icons' }, '   ', { text: personal.networks.facebook, link: personal.networks.facebook, style: 'link' }] });
      }


      if (data.language) {
        const language = data.language;



        languageData.push({ text: 'Languages', style: 'title', margin: [0, 10, 0, 0] });
        languageData.push({ margin: [0, 0, 0, 10], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 175, y2: 0, lineWidth: 1, lineColor: this.colors.secondary }] });
        for (let l of language) {

          languageData.push({
            columns: [
              { text: l.name },
              { text: languageLevels.map(i => ({ text: '', style: 'icons', color: (i + 1) <= l.level.id ? this.colors.circle : this.colors.disabled })) }
            ]
          })

        }

      }


      if (data.skill) {
        const skills = data.skill;
        skillData.push({ text: 'Skills', style: 'title', margin: [0, 10, 0, 0] });
        skillData.push({ margin: [0, 0, 0, 10], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 175, y2: 0, lineWidth: 1, lineColor: this.colors.secondary }] });
        for (let s of skills) {
          skillData.push({
            columns: [
              { text: s.name },
              { text: skillLevels.map(i => ({ text: '', style: 'icons', color: (i + 1) <= s.level.id ? this.colors.circle : this.colors.disabled })) }
            ]
          })
        }
      }

      if (data.interest) {
        const interests = data.interest;
        interestData.push({ text: 'Interests', style: 'title', margin: [0, 10, 0, 0] });
        interestData.push({ margin: [0, 0, 0, 10], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 175, y2: 0, lineWidth: 1, lineColor: this.colors.secondary }] });
        interestData.push({ text: interests.map((i, index) => `${i.name}${index < interests.length - 1 ? ', ' : ''}`) })

      }


      pdf.add({
        columns: [
          {
            stack: [
              { canvas: [polyline, ellipse] },
              { text: `${data.personal.firstName}  ${data.personal.lastName}`, width: (MAX_WIDTH / 3), bold: true, fontSize: 15, color: this.colors.primary, alignment: 'center', relativePosition: { x: 0, y: -170 } },
              { ...img },
              {
                stack: [...personalData, ...languageData, ...skillData, ...interestData], margin: [5, 10, 0, 0]
              }
            ],
            width: (MAX_WIDTH / 3)
          },
          { stack: [''], width: (MAX_WIDTH * 2 / 3) }
        ],
        absolutePosition: [0, 0]
      })



      return pdf.create();

    } catch (error) {
      console.log('error', error);
    }


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
            { text: `( ${_.lowerCase(skill.level.name)} )`, color: this.colors.gray, margin: [0, 0, 0, 3] },
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
            { text: `( ${_.lowerCase(language.level.name)} )`, color: this.colors.gray, margin: [0, 0, 0, 3] },
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
      title: {
        fontSize: 15,
        bold: true,
        color: this.colors.secondary
      },
      icons: {
        font: 'icons'
      },
      description: {
        fontSize: 12
      },
      link: {
        fontSize: 10
      }
    });
  }
}



// .icon - mail:before { content: '\e800'; } /* '' */
// .icon - mobile:before { content: '\e801'; } /* '' */
// .icon - website:before { content: '\e802'; } /* '' */
// .icon - user:before { content: '\e803'; } /* '' */
// .icon - star:before { content: '\e804'; } /* '' */
// .icon - twitter:before { content: '\f099'; } /* '' */
// .icon - github - circled:before { content: '\f09b'; } /* '' */
// .icon - circle:before { content: '\f111'; } /* '' */
// .icon - instagram:before { content: '\f16d'; } /* '' */
// .icon - whatsapp:before { content: '\f232'; } /* '' */
// .icon - linkedin - squared:before { content: '\f30c'; } /* '' */
// .icon - facebook - circled:before { content: '\f30d'; } /* '' */