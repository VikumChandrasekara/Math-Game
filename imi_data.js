//token used for testing purposes
const USER = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJMQUtJVEhBIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTU4NjM0MjYxNywiZXhwIjoxNjE3ODc4NjE3LCJ1ZCI6IjRmZjIwOWJhLWQxYzMtNDJjNS1hZGU5LTg2YWU4NDMzNGZlZiIsInR5cGUiOiJBQ0NFU1MifQ.3d84f3RvQQlpIOsDsQllyO-pGFdJx7q9zNYnKeVvjTo';

const LANGUAGES = {1:'SINHALA', 2:'TAMIL', 3:'ENGLISH'};
const APP_PLATFORMS = {1:'pwa',2:'flutter'};
const lang_id = LANGUAGES[1];
const plat_id = APP_PLATFORMS[1];

const IMI_DATA = {

    //copy vals from dev console
    GAME_ID : "f4cbc871-90e6-4224-b82b-9240578070e8", //15e4ab7f-6d9f-42dc-9496-3d2fd32a94f8
    LB_ID : "bf6f650b-5734-46e6-9d19-16459c347384", //b95b21e5-0f20-4893-904c-174f41c0a9f7

    //user-defined values. enter 6-digit numbers
    P_SCORE : 685314,
    Q_SCORE : 496315,
    Z_SCORE : 753642,
    SCORE_LOCK : 456120,

    //xp data predefined
    //live values
    XP : [
        { min: 0, max: 100, difficulty: 50, max_playable_score: 100 },
        { min: 100, max: 200, difficulty: 50, max_playable_score: 500 },
        { min: 200, max: 300, difficulty: 50, max_playable_score: 1000 }
    ],
    //testing values
    QA_XP : [
        { min: 0, max: 100, difficulty: 50, max_playable_score: 5 },
        { min: 100, max: 200, difficulty: 50, max_playable_score: 10 },
        { min: 200, max: 300, difficulty: 50, max_playable_score: 15 }
    ],
    //texture coordinates
    LABELS : [
        { min_tex: 10, max_tex: 110, title: 1100, },
        { min_tex: 110, max_tex: 210, title: 1200, },
        { min_tex: 210, max_tex: 310, title: 1300, }
    ],

    TUTES : [
        'https://www.youtube.com/embed/FoMlSB6ftQg?rel=0',  // sinhala
        'https://www.youtube.com/embed/jE2bCvgZrtw?rel=0',  // tamil
        'https://www.youtube.com/embed/a5cDCS-BdHQ?rel=0'   // english
    ]
};



//#region exports
exports.data =  IMI_DATA
exports.token = USER+"&language="+lang_id+"&platform="+plat_id;
//#endregion


