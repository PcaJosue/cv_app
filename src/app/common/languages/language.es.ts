export const LANGUAGE_ES = {

    main: {
        create: 'Crear CV',
        upload: 'Importar Datos',
        title: 'Curriculum Vitae App',
        subtitle: 'Crea tu futuro con nuestros currículos profesionales en nuestra APP',
        description: "Para crear un CV eficaz, es importante adaptarlo al puesto que solicita. Esto significa incluir palabras clave y frases relevantes que coincidan con la descripción del puesto. El uso de un lenguaje claro y conciso y de viñetas también puede facilitar la lectura y comprensión del CV."
    },
    menu: {
        title: 'Secciones',
        personal: 'Personal',
        laboral: 'Laboral',
        academic: 'Académico',
        languages: 'Lenguajes',
        skills: 'Habilidades',
        achievements: 'Hazañas',
        certifications: 'Certificaciones/Cursos',
        interests: 'Intereses',
        objective: 'Objetivo',
        review: 'Revisión'
    },
    personal: {
        title: 'Datos Personales',
        networks: 'Redes Sociales',
        firstName: 'Primer Nombre',
        lastName: 'Apellido',
        career: 'Carrera/Ocupación',
        phone: 'Teléfono',
        email: 'Correo',
        country: 'País',
        state: 'Estado/Provincia/Ciudad',
        other: 'Sitio Web'
    },
    laboral: {
        title: 'Información Laboral',
        job: 'Título de trabajo',
        employer: 'Empleador',
        country: 'País',
        city: 'Ciudad',
        startDate: 'Fecha Inicio',
        endDate: 'Fecha fin',
        currentlyWorking: 'actualmente trabajando',
        functionsPlaceholder: 'Describe tus funciones, separe cada oración con un punto',
        myInformation: 'Mi información Laboral',
        functions: 'Funciones'
    },
    academic: {
        title: 'Información Académica',
        placeholder: {
            school: 'Universidad de ...',
            career: 'Nombre de la Carrera',
            location: 'Ecuador'
        },
        school: 'Nombre de la Escuela',
        career: 'Nombre de la Carrera',
        location: 'Locación',
        startDate: 'Fecha Inicio',
        endDate: 'Fecha Fin',
        currentlyStudying: 'actualmente estudiando',
        myInformation: 'Mi información académica',
        unfinish: 'No terminado'

    },
    language: {
        levels: [{ id: 1, name: 'Principiante' }, { id: 2, name: 'Elemental' }, { id: 3, name: 'Intermedio' }, { id: 4, name: 'Intermedio - avanzado' }, { id: 5, name: 'Avanzado' }, { id: 6, name: 'Proficiencia' }, { id: 7, name: 'Nativo' }],
        title: 'Información de Lenguajes',
        name: 'Nombre del Lenguaje',
        level: 'Nivel',
        myInformation: 'Mis Lenguajes',
    },
    skill: {
        levels: [{ id: 1, name: 'Novato' }, { id: 2, name: 'Novato avanzado' }, { id: 3, name: 'Competente' }, { id: 4, name: 'Proficiencia' }, { id: 5, name: 'Experto' }],
        title: 'Información de Habilidades',
        name: 'Nombre de Habilidad',
        level: 'Nivel',
        myInformation: 'Mis Habilidades',
    },
    achievement: {
        title: 'Información de Hazañas',
        placeholder: {
            name: 'Optimización de ventas de ...',
            description: 'Fui capaz de ...'
        },
        name: 'Nombre',
        date: 'Fecha',
        description: 'Descripción',
        myInformation: 'Mis Hazañas',
    },
    certification: {
        title: 'Información de Certificaciones y Cursos',
        placeholder: {
            name: 'PPM',
            school: 'Universidad de ...'
        },
        name: 'Nombre',
        date: 'Fecha',
        school: 'Escuela',
        myInformation: 'Mis Certificaciones/Cursos',
    },
    interest: {
        title: 'Información de Intereses',
        placeholder: {
            name: 'Medio Ambiente',
        },
        name: 'Nombre',
        myInformation: 'Mis Intereses',
    },
    objective: {
        title: 'Objetivo',
        name: 'Objetivo',
        fit: 'Cómo mis habilidades se alinean con sus requisitos'
    },
    messages: {
        required: 'Por favor, llene todos los valores requeridos'
    },
    review: {
        preview: 'Vista Previa',
        download: 'Descargar PDF',
        export: 'Exportar Datos',
        title: 'Vista Previa PDF'
    },
    buttons: {
        back: 'Atrás',
        next: 'Siguiente',
        save: 'Confirmar',
        edit: 'Editar',
        add: 'Agregar',
        remove: 'Remover'
    },
    formats: ['international', 'cool'],
    pdf: {
        international: {
            title: 'Curriculum Vitae',
            laboral: 'Información Laboral',
            academic: 'Información Académica',
            skill: 'Habilidades',
            language: 'Información de Lenguajes',
            achievement: 'Hazañas',
            certification: 'Certificaciones / Cursos',
            interest: 'Intereses'

        },
        cool: {
            personal: 'Datos Personales',
            language: 'Lenguajes',
            skill: 'Habilidades',
            interest: 'Intereses',
            profile: 'Perfil',
            academic: 'Información Académica',
            laboral: 'Información Laboral',
            certification: 'Certificaciones y Cursos',
            achievement: 'Hazañas'

        }
    }


}
