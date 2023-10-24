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
    gray: '#616A6B ',
    primary: '#ebeaeb',
    secondary: '#587181',
    circle: '#d2d2d2',
    disabled: '#cfcfcf',
    secondaryText: '#587181'
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


  getImage(profile) {
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

  async createCoolPdf(data: any, primaryColor, secondaryColor) {

    this.colors.primary = primaryColor;
    this.colors.secondary =secondaryColor;

    const labels = this.labels.cool;
    const languageLevels = [...Array(7).keys()]
    const skillLevels = [...Array(5).keys()]
    const personalData = [];
    const languageData = [];
    const skillData = [];
    const interestData = [];
    const objectiveData = [];
    const laboralData = [];
    const academicData = [];
    const achievementData = [];
    const certificationData = [];

    try {
      const circleCanvas: any = data.personal.photo ? await this.getImage(data.personal.photo) : null;

      const pdf = new PdfMakeWrapper();
      pdf.pageSize('A4');
      this.setStyles(pdf);

      let img = circleCanvas ? await new Img(circleCanvas).absolutePosition(0, 0).build() : { text: '' };

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


      if (data.personal) {
        const personal = data.personal;
        personalData.push({ text: labels.personal, style: 'title' });
        personalData.push({ margin: [0, 0, 0, 10], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 175, y2: 0, lineWidth: 1, lineColor: this.colors.secondary }] });
        personalData.push({ text: personal.ocupation, alignment: 'center', bold: true });
        personalData.push({ text: [{ text: '', style: 'icons' }, '   ', `${personal.firstName} ${personal.lastName}`] });
        personalData.push({ text: [{ text: '', style: 'icons' }, '   ', `${personal.email}`] });
        personalData.push({ text: [{ text: '', style: 'icons' }, '   ', `${personal.phone}`] });

        if (personal.networks?.other) personalData.push({ text: [{ text: '', style: 'icons' }, '   ', { text: personal.networks.other, link: personal.networks.other, style: 'link' }] });
        if (personal.networks?.linkedin) personalData.push({ text: [{ text: '', style: 'icons' }, '   ', { text: personal.networks.linkedin, link: personal.networks.linkedin, style: 'link' }] });
        if (personal.networks?.github) personalData.push({ text: [{ text: '', style: 'icons' }, '   ', { text: personal.networks.github, link: personal.networks.github, style: 'link' }] });
        if (personal.networks?.instagram) personalData.push({ text: [{ text: '', style: 'icons' }, '   ', { text: personal.networks.instagram, link: personal.networks.instagram, style: 'link' }] });
        if (personal.networks?.twitter) personalData.push({ text: [{ text: '', style: 'icons' }, '   ', { text: personal.networks.twitter, link: personal.networks.twitter, style: 'link' }] });
        if (personal.networks?.facebook) personalData.push({ text: [{ text: '', style: 'icons' }, '   ', { text: personal.networks.facebook, link: personal.networks.facebook, style: 'link' }] });
      }


      if (data.language?.length > 0) {
        const language = data.language;



        languageData.push({ text: labels.language, style: 'title', margin: [0, 10, 0, 0] });
        languageData.push({ margin: [0, 0, 0, 10], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 175, y2: 0, lineWidth: 1, lineColor: this.colors.secondary }] });
        for (let l of language) {

          languageData.push({
            columns: [
              { text: l.name },
              { text: languageLevels.map(i => ({ text: '', style: 'icons', color: (i + 1) <= l.level.id ? this.colors.secondary : this.colors.disabled })) }
            ]
          })

        }

      }


      if (data.skill?.length > 0) {
        const skills = data.skill;
        skillData.push({ text: labels.skill, style: 'title', margin: [0, 10, 0, 0] });
        skillData.push({ margin: [0, 0, 0, 10], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 175, y2: 0, lineWidth: 1, lineColor: this.colors.secondary }] });
        for (let s of skills) {
          skillData.push({
            columns: [
              { text: s.name },
              { text: skillLevels.map(i => ({ text: '', style: 'icons', color: (i + 1) <= s.level.id ? this.colors.secondary : this.colors.disabled })) }
            ]
          })
        }
      }

      if (data.interest?.length > 0) {
        const interests = data.interest;
        interestData.push({ text: labels.interest, style: 'title', margin: [0, 10, 0, 0] });
        interestData.push({ margin: [0, 0, 0, 10], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 175, y2: 0, lineWidth: 1, lineColor: this.colors.secondary }] });
        interestData.push({ text: interests.map((i, index) => `${i.name}${index < interests.length - 1 ? ', ' : ''}`) })

      }


      if (data.objective) {
        objectiveData.push({ text: labels.profile, style: 'title', margin: [0, 10, 0, 0] });
        objectiveData.push({ margin: [0, 0, 0, 10], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 400, y2: 0, lineWidth: 1, lineColor: this.colors.secondary }] });
        objectiveData.push({ text: data.objective, style: 'description' })

      }

      if (data.academic?.length > 0) {
        const academics = data.academic;
        academicData.push({ text: labels.academic, style: 'title', margin: [0, 10, 0, 0] });
        academicData.push({ margin: [0, 0, 0, 10], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 400, y2: 0, lineWidth: 1, lineColor: this.colors.secondary }] });
        for (let academic of academics) {
          academicData.push({ columns: [{ text: academic.career, bold: true }, { alignment: 'right', style: 'secondaryText', text: `${academic.startDate} - ${academic.endDate ? academic.endDate : 'today'}` }] })
          academicData.push({ text: `${academic.school} - ${_.capitalize(academic.location)}`, style: 'secondaryText', margin: [0, 0, 0, 5] })
        }
      }

      if (data.laboral?.length > 0) {
        laboralData.push({ text: labels.laboral, style: 'title', margin: [0, 10, 0, 0] });
        laboralData.push({ margin: [0, 0, 0, 10], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 400, y2: 0, lineWidth: 1, lineColor: this.colors.secondary }] });
        for (let laboral of data.laboral) {
          laboralData.push({ columns: [{ text: laboral.job, bold: true }, { alignment: 'right', style: 'secondaryText', text: `${laboral.startDate} - ${laboral.endDate ? laboral.endDate : 'Today'} (${this.getAgeDIfference(laboral.endDate , laboral.startDate)})` }] })
          laboralData.push({ text: `${_.capitalize(laboral.employer)} - ${_.capitalize(laboral.city)}`, style: 'secondaryText' })
          laboralData.push({ ul: laboral.functions.split('\n').filter(l => l.length > 0).map(l => ({ text: l, style: 'description' })), margin: [0, 0, 0, 5] })
        }
      }

      if (data.certification?.length > 0) {
        certificationData.push({ text: labels.certification, style: 'title', margin: [0, 10, 0, 0] });
        certificationData.push({ margin: [0, 0, 0, 10], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 400, y2: 0, lineWidth: 1, lineColor: this.colors.secondary }] });
        for (let certification of data.certification) {
          certificationData.push({ columns: [{ text: certification.name, bold: true }, { alignment: 'right', style: 'secondaryText', text: certification.date }] })
          certificationData.push({ text: _.capitalize(certification.school), style: 'secondaryText', margin: [0, 0, 0, 5] })
        }
      }

      if (data.achievement?.length > 0) {
        achievementData.push({ text: labels.achievement, style: 'title', margin: [0, 10, 0, 0] });
        achievementData.push({ margin: [0, 0, 0, 10], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 400, y2: 0, lineWidth: 1, lineColor: this.colors.secondary }] });
        for (let achiev of data.achievement) {
          achievementData.push({ columns: [{ text: achiev.name, bold: true }, { alignment: 'right', style: 'secondaryText', text: achiev.date }] })
          achievementData.push({ text: _.capitalize(achiev.description), style: 'description', margin: [0, 0, 0, 5] })
        }
      }



      pdf.add({
        columns: [
          {
            stack: [
              { canvas: [polyline, ellipse] },
              { text: `${data.personal.firstName}  ${data.personal.lastName}`, width: (MAX_WIDTH / 3), bold: true, fontSize: 11, color: this.colors.primary, alignment: 'center', relativePosition: { x: 0, y: -170 } },
              { ...img },
              {
                stack: [...personalData, ...languageData, ...skillData, ...interestData], margin: [5, 10, 0, 0]
              }
            ],
            width: (MAX_WIDTH / 3)
          },
          { stack: [...objectiveData, ...academicData, ...laboralData, ...certificationData, ...achievementData], width: (MAX_WIDTH * 2 / 3), margin: [10, 0, 10, 0] }
        ],
        absolutePosition: [0, 0]
      })



      return pdf.create();

    } catch (error) {
      console.log('error', error);
      return null;
    }


  }






  createPdf(data: any): ICreatePDF {

    const labels = this.labels.international;
    const pdf = new PdfMakeWrapper();
    const personalInfo = [];
    const links = [];


    pdf.pageSize('A4');
    this.setStyles(pdf);
    pdf.add({ text: `${_.capitalize(data.personal.firstName)} ${_.capitalize(data.personal.lastName)}`, style: 'header' })

    pdf.add({
      columns: [
        { text: _.upperCase(data.personal.ocupation), style: 'subheader', color: this.colors.gray, alignment: 'left' },
        { text: `${_.capitalize(data.personal.state)} - ${_.capitalize(data.personal.country)}`, color: this.colors.gray, alignment: 'right' }
      ]
    })


    pdf.add({ margin: [0, 10, 0, 10], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 2 }] });

    personalInfo.push({ text: [{ text: '', style: 'icons' }, ' ', { text: data.personal.phone }] })
    personalInfo.push({ text: [{ text: '', style: 'icons' }, ' ', { text: data.personal.email, link: `mailto:${data.personal.email}` }] })
    if (data.personal.networks.other) personalInfo.push({ text: [{ text: '', style: 'icons' }, ' ', { text: data.personal.networks.other, link: data.personal.networks.other }] })
    if (data.personal.networks.github) personalInfo.push({ text: [{ text: '', style: 'icons' }, ' ', { text: data.personal.networks.github, link: data.personal.networks.github }] })
    if (data.personal.networks.linkedin) personalInfo.push({ text: [{ text: '', style: 'icons' }, ' ', { text: data.personal.networks.linkedin, link: data.personal.networks.linkedin }] })
    if (data.personal.networks.instagram) personalInfo.push({ text: [{ text: '', style: 'icons' }, ' ', { text: data.personal.networks.instagram, link: data.personal.networks.instagram }] })
    if (data.personal.networks.twitter) personalInfo.push({ text: [{ text: '', style: 'icons' }, ' ', { text: data.personal.networks.twitter, link: data.personal.networks.twitter }] })
    if (data.personal.networks.facebook) personalInfo.push({ text: [{ text: '', style: 'icons' }, ' ', { text: data.personal.networks.twitter, link: data.personal.networks.facebook }] })

    pdf.add({
      columns: [
        { stack: personalInfo },
        { text: links, alignment: 'right', fontSize: 14 }
      ],
      margin: [0, 0, 0, 15]
    })

    if (data.objective) {
      pdf.add({
        text: data.objective, style: 'description',
        margin: [0, 0, 0, 15]
      })
    }

    if (data.academic.length > 0) {

      pdf.add({ text: `${_.startCase(labels.academic)}`, style: 'header' })
      pdf.add({ margin: [0, 5, 0, 15], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 2 }] });

      const academicInformation = data.academic.map(academic => {

        const information = [];
        information.push({ text: `${_.capitalize(academic.school)}`,style: 'subheader', margin: [0, 0, 0, 3] });
        information.push({ text: _.capitalize(academic.career), style:'subheaderNoBold', margin: [0, 0, 0, 3] });
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

    if (data.laboral.length > 0) {

      pdf.add({ text: `${_.startCase(labels.laboral)}`, style: 'header' })
      pdf.add({ margin: [0, 5, 0, 15], canvas: [{ type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 2 }] });

      const laboralInformation = data.laboral.map(laboral => {

        const information = [];
        information.push({
          text: [
            { text: _.capitalize(laboral.employer), style: 'subheader' },
            { text: `   ( ${_.capitalize(laboral.job)} )`, color: this.colors.gray, alignment: 'right' }

          ], margin: [0, 0, 0, 3]
        })
        information.push({
          columns: [
            { text: `${laboral.startDate} - ${laboral.endDate ? laboral.endDate : 'Today'} (${this.getAgeDIfference(laboral.endDate , laboral.startDate)})`, color: this.colors.gray },
            { text: ` ${_.capitalize(laboral.city)} : ${_.capitalize(laboral.country)}`, color: this.colors.gray, alignment: 'right' }
          ], margin: [0, 0, 0, 3]
        })
        information.push({ ul: laboral.functions ? laboral.functions.split('\n').filter(l => l.length > 0).map(f => ({ text: f, style: 'description' })) : [], margin: [0, 0, 0, 3] })
        return { stack: information, margin: [0, 0, 0, 5] }
      })

      pdf.add({
        stack: laboralInformation,
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
            { text: _.capitalize(skill.name), style: 'descriptionBold', margin: [0, 0, 0, 3] },
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
            { text: _.capitalize(language.name), style: 'descriptionBold', margin: [0, 0, 0, 3] },
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
            { text: _.capitalize(certification.name), style: 'descriptionBold', margin: [0, 0, 0, 3] },
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
      fontSize: 9
    });

    pdf.styles({
      header: {
        fontSize: 16,
        bold: true
      },
      subheader: {
        fontSize: 14,
        bold: true
      },
      subheaderNoBold:{
        fontSize: 14,
      },
      title: {
        fontSize: 11,
        bold: true,
        color: this.colors.secondary
      },
      icons: {
        font: 'icons'
      },
      description: {
        fontSize: 8
      },
      descriptionBold: {
        fontSize: 8,
        bold: true
      },
      link: {
        fontSize: 6
      },
      secondaryText: {
        fontSize: 7,
        color: this.colors.secondaryText
      }
    });
  }

  getAgeDIfference(endDate, startDate){
    const date1= new Date(startDate);
    const date2 = endDate ? new Date(endDate): new Date();

    let yearDiff = date2.getFullYear() - date1.getFullYear();
    let monthDiff = date2.getMonth() - date1.getMonth();

    if(monthDiff < 0){
      yearDiff--;
      monthDiff += 12;
    }

    return (yearDiff > 0 ? `${yearDiff} years`:'' ) + (monthDiff > 0 ? ` ${monthDiff} months`:'')

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
