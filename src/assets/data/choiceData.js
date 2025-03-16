export const SETTINGS_CHOICE_WIDTH = 49;
export const SETTINGS_CHOICE_HEIGHT = 49;

export const DIFFICULTY_CHOICE_WIDTH = 87;
export const DIFFICULTY_CHOICE_HEIGHT = 49;

export const CHOICE_PADDING = 10;

export const CHOICE_STATES = {
    0 : "UNSELECTED",
    1 : "SELECTED",
}//end CHOICES_STATES

export const SETTINGS_CHOICES = {
    1 : {
        BASE : { x: 0, y: 0, width: SETTINGS_CHOICE_WIDTH, height: SETTINGS_CHOICE_HEIGHT },
        SELECTED : { x: 0, y:49, width: SETTINGS_CHOICE_WIDTH, height: SETTINGS_CHOICE_HEIGHT }
    },
    2 : {
        BASE : { x: 49, y: 0, width: SETTINGS_CHOICE_WIDTH, height: SETTINGS_CHOICE_HEIGHT },
        SELECTED : { x: 49, y:49, width: SETTINGS_CHOICE_WIDTH, height: SETTINGS_CHOICE_HEIGHT }
    },
    3 : {
        BASE : { x: 49 * 2, y: 0, width: SETTINGS_CHOICE_WIDTH, height: SETTINGS_CHOICE_HEIGHT },
        SELECTED : { x: 49 * 2, y:49, width: SETTINGS_CHOICE_WIDTH, height: SETTINGS_CHOICE_HEIGHT }
    },
    4 : {
        BASE : { x: 49 * 3, y: 0, width: SETTINGS_CHOICE_WIDTH, height: SETTINGS_CHOICE_HEIGHT },
        SELECTED : { x: 49 * 3, y:49, width: SETTINGS_CHOICE_WIDTH, height: SETTINGS_CHOICE_HEIGHT }
    },
    5 : {
        BASE : { x: 49 * 4, y: 0, width: SETTINGS_CHOICE_WIDTH, height: SETTINGS_CHOICE_HEIGHT },
        SELECTED : { x: 49 * 4, y:49, width: SETTINGS_CHOICE_WIDTH, height: SETTINGS_CHOICE_HEIGHT }
    },
    ON : {
        BASE : { x: 49 * 5, y: 0, width: SETTINGS_CHOICE_WIDTH, height: SETTINGS_CHOICE_HEIGHT },
        SELECTED : { x: 49 * 5, y:49, width: SETTINGS_CHOICE_WIDTH, height: SETTINGS_CHOICE_HEIGHT }
    },
    OFF : {
        BASE : { x: 49 * 6, y: 0, width: SETTINGS_CHOICE_WIDTH, height: SETTINGS_CHOICE_HEIGHT },
        SELECTED : { x: 49 * 6, y:49, width: SETTINGS_CHOICE_WIDTH, height: SETTINGS_CHOICE_HEIGHT }
    },
};//end SETTINGS_CHOICES

export const DIFFICULTY_CHOICES = {
    BEGINNER : {
        BASE : { x: 343, y: 0, width: DIFFICULTY_CHOICE_WIDTH, height: DIFFICULTY_CHOICE_HEIGHT },
        SELECTED : { x: 343, y: 49, width: DIFFICULTY_CHOICE_WIDTH, height: DIFFICULTY_CHOICE_HEIGHT },
    },
    EXPERT : {
        BASE : { x: 430, y: 0, width: DIFFICULTY_CHOICE_WIDTH, height: DIFFICULTY_CHOICE_HEIGHT },
        SELECTED : { x: 430, y: 49, width: DIFFICULTY_CHOICE_WIDTH, height: DIFFICULTY_CHOICE_HEIGHT },
    },
}//end DIFFICULTY_CHOICES

export const CHARACTER_CHOICES = {
    F001: { x: 517,  y: 0, width: 18, height: 29 },
    F002: { x: 517, y: 29, width: 18, height: 29 },
};//end CHARACTER_CHOICES