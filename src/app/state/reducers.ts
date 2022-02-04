import { personalReducer } from "./personal_information/personal.reducer";
import { manageLanguageReducer } from "./manage_language/manage_language.reducer";
import { laboralReducer } from "./laboral_information/laboral.reducer";
import { academicReducer } from "./academic_information/academic.reducer";
import { languageReducer } from "./language_information/language.reducer";
import { skillReducer } from "./skill_information/skill.reducer";
import { achievementReducer } from "./achievement_information/achievement.reducer";
import { certificationReducer } from "./certification_information/certification.reducer";
import { interestReducer } from "./interest_information/interest.reducer";

export const reducers = {
    personal: personalReducer,
    manage_language: manageLanguageReducer,
    laboral: laboralReducer,
    academic: academicReducer,
    language: languageReducer,
    skill: skillReducer,
    achievement: achievementReducer,
    certification: certificationReducer,
    interest: interestReducer
}