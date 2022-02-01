import { personalReducer } from "./personal_information/personal.reducer";
import { manageLanguageReducer } from "./manage_language/manage_language.reducer";
import { laboralReducer } from "./laboral_information/laboral.reducer";
import { academicReducer } from "./academic_information/academic.reducer";

export const reducers = {
    personal: personalReducer,
    manage_language: manageLanguageReducer,
    laboral: laboralReducer,
    academic: academicReducer
}