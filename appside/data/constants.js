"use strict";

// Constants, magic strings, and macros

// Knowledgebase keys
var KB_KEY_SECTION = 'Category';

// category
var CATEGORY_DBT_WORKSHEET = 1;
var CATEGORY_BODY_MAP = 2;

// direction
var DIRECTION_FWD = 'f';
var DIRECTION_REVERSE = 'r';

// section names (direct strings from knowledgebase)
var SECTION_PROMPTING = 'Prompting events';
var SECTION_INTERP = 'Interpretations of events';
var SECTION_BIO = 'Biological changes and experiences';
var SECTION_ACT = 'Expressions and actions';
var SECTION_AFTER = 'Aftereffects';

// Summary template types
var SUMMARY_TEMPLATE_COUNT = 'count';
var SUMMARY_TEMPLATE_QUAL = 'qual';

// Body config (all DBT worksheet models)
var BODY_STATEMENTS_PER_PAGE = 12;
var STATEMENTS_FRAME_TEMPLATE = 'statements';
var EMOTION_TYPE = ['anger', 'disgust', 'envy', 'fear', 'guilt', 'happiness', 'love', 'sadness', 'shame'];
var BODY_PART = ['head', 'neck', 'arms', 'chest', 'belly', 'legs'];
var SVG_URL = 'http://www.w3.org/2000/svg';

// Intro frame strings
var the_title = 'Emotional Clarity App';
var INTRO_FRAME_TEMPLATE = 'intro';
var INTRO_TITLE = {};
INTRO_TITLE[SECTION_PROMPTING] = the_title;
INTRO_TITLE[SECTION_INTERP] = the_title;
INTRO_TITLE[SECTION_BIO] = the_title;
INTRO_TITLE[SECTION_ACT] = the_title;
INTRO_TITLE[SECTION_AFTER] = the_title;

var INTRO_TEXT_START = 'Consider the Reference Event that you just wrote about.';
var INTRO_MAIN_TEXT = {};
INTRO_MAIN_TEXT[SECTION_PROMPTING] = 'In the following exercise, you will answer some questions about components of the Reference Event.';
INTRO_MAIN_TEXT[SECTION_INTERP] = 'In the following exercise, you will answer some questions about your interpretations of the Reference Event or thoughts you are having right now as a result.';
INTRO_MAIN_TEXT[SECTION_BIO] = 'In the following exercise, you will answer some questions about biological changes and experiences you are having right now.';
INTRO_MAIN_TEXT[SECTION_ACT] = 'In the following exercise, you will answer some questions about your actions and expressions in response to the Reference Event.';
INTRO_MAIN_TEXT[SECTION_AFTER] = 'In the following exercise, you will answer some questions about things you are likely to do, feel, or experience in the near future, now that you have recalled the Reference Event.';
var INTRO_TEXT_END = 'Tap NEXT to begin.';

function INTRO_TEXT(section) {
    return [INTRO_TEXT_START, INTRO_MAIN_TEXT[section], INTRO_TEXT_END];
}

// Body frame strings
var BODY_TITLE = 'Questions';
var BODY_QUESTION = {}
BODY_QUESTION[SECTION_PROMPTING] = 'Check the box for each item that describes a component of the Reference Event.';
BODY_QUESTION[SECTION_INTERP] = ' Check the box for each item that describes your interpretations of the Reference Event or thoughts you are having right now as a result.';
BODY_QUESTION[SECTION_BIO] = 'Check the box for each item that describes biological changes or experiences you are having right now.';
BODY_QUESTION[SECTION_ACT] = 'Check the box for each item that describes your actions and expressions right now in response to the Reference Event.';
BODY_QUESTION[SECTION_AFTER] = 'Check the box for each item that describes things you are likely to do, feel, or experience in the near future, now that you have recalled the Reference Event.';

// Likert frame strings
var LIKERT_FRAME_TEMPLATE = 'likert';
var LIKERT_TITLE = 'Likert';
var LIKERT_INSTRUCTIONS = 'Please indicate how much each statement applies to you right now.';

// Pre-measurement strings
var SDERS_QUESTIONS = ['I am confused about how I feel.', 'I have no idea how I am feeling.'];
var SDERS_QUALIFIERS = ['not all all', 'somewhat', 'moderately', 'very much', 'completely'];

// Self report strings
var SELF_REPORT_FRAME_TEMPLATE = 'self_report';
var SELF_REPORT_Q1 = 'Which emotion(s) are you feeling right now after thinking about the Reference Event?';
var SELF_REPORT_Q2 = 'How certain are you about your answer to the previous question?';
var QUALIFIERS = ['Very uncertain', 'Somewhat uncertain', 'Neutral', 'Somewhat certain', 'Very certain'];

// Consent disclosure frame strings
var CONSENT_DISCLOSURE_TITLE = 'Consent';
var CONSENT_DISCLOSURE_FRAME_TEMPLATE = 'consent_disclosure';
var CONSENT_DISCLOSURE_QUESTIONS = ['I have read the information above. I understand the risks of this study and wish to participate.',
    'I am 18 or 19 years old.',
    'I am not able to read, understand, and respond to a web questionnaire written in English.'];
var CONSENT_DISCLOSURE_INSTRUCTIONS = 'Please click on the following link to read the consent disclosure form.';

// Summary frame strings (all DBT worksheet models)
var SUMMARY_TITLE = 'Summary';
var SUMMARY_TEXT = 'Please reflect on this summary to see which emotion(s), if any, resonate most with your experience of the Reference Event.';
var SUMMARY_FOLLOW_TEXT = 'Thank you for doing this activity.';
var SUMMARY_COUNT_FRAME_TEMPLATE = 'summary_count';


