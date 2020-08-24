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

// generic value for frame name (when we don't need to distinguish)
var RESPONSE_GENERIC = 'response';
var RESPONSE_PHQ = 'phq';
var RESPONSE_PRE = 'pre';
var RESPONSE_POST = 'post';
var RESPONSE_INDUCTION = 'induction';

// Body config (all DBT worksheet models)
var BODY_STATEMENTS_PER_PAGE = 12;
var STATEMENTS_FRAME_TEMPLATE = 'statements';
var EMOTION_TYPE = ['anger', 'disgust', 'envy', 'fear', 'guilt', 'happiness', 'love', 'sadness', 'shame'];
var BODY_PART = ['head', 'neck', 'arms', 'chest', 'belly', 'legs'];
var SVG_URL = 'http://www.w3.org/2000/svg';

// Welcome frame (study)
var SW_FRAME_TEMPLATE = 'study-welcome';
var SW_TITLE = 'Welcome to the Emotional Clarity Study';
var SW_TEXT = 'Thank you for volunteering for this study.';

// Browser check frame
var BC_FRAME_TEMPLATE = 'browser-check';
var BC_TITLE = 'Please use a desktop browser';
var BC_TEXT = 'We didn\'t test this app on small screens or touch screens, you might not be able to complete the study on a mobile device. Please use google chrome browser on a laptop or desktop.';

// Intro frame strings
var the_title = 'The App';
var INTRO_FRAME_TEMPLATE = 'intro';
var INTRO_TITLE = {};
INTRO_TITLE[SECTION_PROMPTING] = the_title;
INTRO_TITLE[SECTION_INTERP] = the_title;
INTRO_TITLE[SECTION_BIO] = the_title;
INTRO_TITLE[SECTION_ACT] = the_title;
INTRO_TITLE[SECTION_AFTER] = the_title;

var the_intruction = 'Welcome to the Emotional Clarity App!';
var INTRO_INSTRUCTION = {};
INTRO_INSTRUCTION[SECTION_PROMPTING] = the_intruction;
INTRO_INSTRUCTION[SECTION_INTERP] = the_intruction;
INTRO_INSTRUCTION[SECTION_BIO] = the_intruction;
INTRO_INSTRUCTION[SECTION_ACT] = the_intruction;
INTRO_INSTRUCTION[SECTION_AFTER] = the_intruction;

var INTRO_TEXT_START = 'Consider the Reference Event that you just wrote about.';
var INTRO_MAIN_TEXT = {};
INTRO_MAIN_TEXT[SECTION_PROMPTING] = 'In the following exercise, you will answer some questions about components of the Reference Event.';
INTRO_MAIN_TEXT[SECTION_INTERP] = 'In the following exercise, you will answer some questions about your interpretations of the Reference Event or thoughts you are having right now as a result.';
INTRO_MAIN_TEXT[SECTION_BIO] = 'In the following exercise, you will answer some questions about biological changes and experiences you are having right now.';
INTRO_MAIN_TEXT[SECTION_ACT] = 'In the following exercise, you will answer some questions about your actions and expressions in response to the Reference Event.';
INTRO_MAIN_TEXT[SECTION_AFTER] = 'In the following exercise, you will answer some questions about things you are likely to do, feel, or experience in the near future, now that you have recalled the Reference Event.';
var INTRO_TEXT_INFO = 'This exercise may help you reflect on your emotions and gain emotional clarity.'
var INTRO_TEXT_END = 'Tap NEXT to begin.';

function INTRO_TEXT(section) {
    return [INTRO_TEXT_START, INTRO_MAIN_TEXT[section], INTRO_TEXT_INFO, INTRO_TEXT_END];
}

// phq frame strings
var PHQ_FRAME_TEMPLATE = 'phq';
var PHQ_TITLE = 'Screening questionnaire: PHQ-9';
var PHQ_TEXT = 'Over the last two weeks, how often have you been bothered by any of the following problems?';
var PHQ_QUESTIONS = [
    ['Little interest or pleasure in doing things?', 'phq', true],
    ['Feeling down, depressed, or hopeless?', 'phq', true],
    ['Trouble falling or staying asleep, or sleeping too much?', 'phq', true],
    ['Feeling tired or having little energy?', 'phq', true],
    ['Poor appetite or overeating?', 'phq', true],
    ['Feeling bad about yourself - or that you are a failure or have let yourself or your family down?', 'phq', true],
    ['Trouble concentrating on things, such as reading the newspaper or watching television?', 'phq', true],
    ['Moving or speaking so slowly that other people would have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?', 'phq', true],
    ['Thoughts that you would be better off dead, or of hurting yourself in some way?', 'phq', true],
];
var PHQ_OPTIONS = ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'];
var PHQ_OPTION_VALUES = [0, 1, 2, 3];

// phq result frame strings
var PHQR_FRAME_TEMPLATE = 'phq_result';
var PHQR_TITLE = 'Results of PHQ-9 Screening Questionnaire';
var PHQR_TEXT_NO = 'This study presents unnecessary risk to people experiencing moderate to severe depression because it asks participants to relive a negative emotional experience. Your PHQ-9 result indicates that you may be experiencing moderate to severe depression and should not participate in the study.';
var PHQR_TEXT_YES = 'Your PHQ-9 result indicates that you may continue with the study.';
var PHQ_LOWEST_FAIL = 10;

// Body frame strings
var BODY_TITLE = 'Question';
var BODY_QUESTION = {}
BODY_QUESTION[SECTION_PROMPTING] = 'Which of these are components of the Reference Event?';
BODY_QUESTION[SECTION_INTERP] = 'Which of these describe your interpretations of the Reference Event or thoughts you are having right now as a result?';
BODY_QUESTION[SECTION_BIO] = 'What biological changes or experiences you are having right now?';
BODY_QUESTION[SECTION_ACT] = 'What are your actions and expressions right now in response to the Reference Event?';
BODY_QUESTION[SECTION_AFTER] = 'What are likely to do, feel, or experience in the near future, now that you have recalled the Reference Event?';

// Mood induction frame strings
var SHORT_ANSWER_TEMPLATE = 'short_answer';
var LONG_ANSWER_TEMPLATE = 'long_answer';
var INDUCTION_TITLE = 'Reference Event';
var INDUCTION_THINKING_PROMPT = 'Think of an event in your life when someone close to you made you extremely upset. If you can think of more than one upsetting conflict, event, or experience, pick the event that still makes you the most upset and continues to feel the most unresolved. Type a one-line description of the event.';
var INDUCTION_CHAR_LIMIT = 180;
var INDUCTION_NOTE = 'This event will be referred to as the "Reference Event"';
var INDUCTION_WRITING_PROMPT = 'For the next few minutes, try to re-experience the event as vividly as you can. Picture the event happening to you all over again. Picture in your "mind\'s eye" the surroundings as clearly as possible. See the people or objects; hear the sounds; experience the events happening to you. Think the thoughts that this event makes you think. Feel the same feelings that this event makes you feel. Let yourself react as if you were actually in the middle of it right now. While you re-experience the event, write about what is happening in the situation, how the other person or people involved behaved toward you, and what you are thinking. The screen will advance on its own when the time is up. Begin writing now.';
var INDUCTION_TIME_LIMIT = 130;


// Likert frame strings
var LIKERT_FRAME_TEMPLATE = 'likert';
var LIKERT_FRAME_TITLE = 'Self Assessment';
var LIKERT_TITLE = 'Likert';
var LIKERT_INSTRUCTIONS = 'Please indicate how much each statement applies to you right now.';

// Pre-measurement strings
var SDERS_QUESTIONS = ['I am confused about how I feel.', 'I have no idea how I am feeling.'];
var SDERS_QUALIFIERS = ['not all all', 'somewhat', 'moderately', 'very much', 'completely'];

// Self report strings
var SELF_REPORT_FRAME_TEMPLATE = 'self_report';
var SELF_REPORT_TITLE = 'Identify your emotions';
var SELF_REPORT_Q1 = 'Which emotion(s) are you feeling right now after thinking about the Reference Event?';
var SELF_REPORT_Q2 = 'How certain are you about your answer to the previous question?';
var QUALIFIERS = ['very uncertain', 'somewhat uncertain', 'neutral', 'somewhat certain', 'very certain'];

// Consent disclosure frame strings
var CONSENT_FRAME_TEMPLATE = 'consent';
var CONSENT_DISCLOSURE_TITLE = 'Consent';
var CONSENT_DISCLOSURE_QUESTIONS = ['I have electronically signed the consent form.',];
var CONSENT_DISCLOSURE_INSTRUCTIONS = 'After volunteering for the study, you should have received an email to record your electronic consent using DocuSign. If you have not had a chance to electronically sign the consent form, please email Leah Perlmutter <leahperl@uw.edu>.';


// Summary frame strings (all DBT worksheet models)
var SUMMARY_TITLE = 'Summary';
var SUMMARY_INSTRUCTION = 'That\'s it!';
var SUMMARY_TEXT = '<p>This summary shows which emotions your responses are <i>commonly</i> associated with, but they are not the <i>only</i> emotions that may be associated with your responses.</p>Please reflect on this summary to see which emotion(s), if any, resonate most with your experience of the Reference Event.';
var SUMMARY_FOLLOW_TEXT = 'Thank you for doing this activity.';
var SUMMARY_COUNT_FRAME_TEMPLATE = 'summary_count';

// End frame strings
var END_FRAME_TEMPLATE = 'end';
var END_TITLE = 'End';
var END_CODE_TEXT = 'Your unique completion code is';
var END_DIRECTIONS = `<p>Make sure to record your code before leaving this page. To receive your $12 amazon gift code, please contact the research team by emailing Leah at <a href=mailto:leahperl@uw.edu>leahperl@uw.edu</a> using the subject line "Completed Emotional Clarity Study" and write your completion code in the body of the email.</p>`;

var END_CONTACT = `<p>Please be aware that your responses will not be checked in real time. Here are some resources that can help if you're feeling distressed.</p>
<ul>
<li>People you know
  <ul>
    <li>Your treatment providers and other supportive people you know</li>
  </ul>
</li>
<li>Now Matters Now
  <ul>
    <li>Website with videos for managing the most painful moments of life, based on Dialectical Behavior Therapy (DBT)</li>
    <li><a href="https://www.nowmattersnow.org">nowmattersnow.org</a></li>
  </ul>
</li>
<li>King County Crisis Hotline
  <ul>
    <li> Provides immediate help to individuals, families, and friends of people in emotional crisis </li>
    <li>(206) 461-3222</li>
  </ul>
</li>
<li>UW Mental Health Resources (only available to UW students)
  <ul>
    <li>Two options for mental health care on campus</li>
    <li><a href=
https://wellbeing.uw.edu/topic/mental-health">wellbeing.uw.edu/topic/mental-health</a></li>
  </ul>
</li>
</ul>
<p>If you have questions or concerns about this research, please contact the research team by emailing Leah at <a href=mailto:leahperl@uw.edu>leahperl@uw.edu</a>.
`;

// Feedback frames
var FEEDBACK_FRAME_TEMPLATE = 'feedback';
var FEEDBACK_TITLE = 'Feedback';
var FEEDBACK_YESNO_OPTIONS = ['Yes', 'No'];
var FEEDBACK_YESNO_VALUES = [1, 0];
var FEEDBACK_LIKERT_OPTIONS = [
    'Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree',
];
var FEEDBACK_LIKERT_VALUES = [5, 4, 3, 2, 1];
var FEEDBACK_QUESTIONS = {
    'page_1': [
        ['Did the app help you figure out your emotion(s)?', 'yesno'],
        ['Which specific parts of the app were most helpful and why?', 'text'],
    ],
    'page_2': [
        ['Which features did you like the most?', 'text'],
        ['Which features did you like the least?', 'text'],
        ['What would you add or change, and why?', 'text'],
    ],
    'page_3': [
        ['I would use this app in real life.', 'likert'],
        ['This app would be useful to me in the future.', 'likert'],
        ['In which future situations or moments would you want to use this app most?', 'text'],
    ],
};

var FEEDBACK_PLATFORMS = ['Phone', 'Computer', 'Robot'];
var FEEDBACK_COMPARISON_INSTRUCTION = 'Suppose this app is made available on three different platforms: {}.';
var FEEDBACK_PLACEHOLDER = '{}';
var FEEDBACK_COMPARISON_SKELETON = [
    'How likely are you to use it on {}, and why?',
    'In which situations would you prefer {} over the others?',
];

