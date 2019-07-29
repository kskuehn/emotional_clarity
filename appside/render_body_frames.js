"use strict";

// test method for rendering any of several kinds of frame, specified in query string.
$(document).ready(function() {
    let test_methods = {
        'statements': statements_frame_main,
        'words': words_frame_main,
        'summary': summary_frame_main,
    };
    let page_types = Object.keys(test_methods);
    let page_to_show = page_types[0];

    // see if a frame type was written in the query string, otherwise use default
    let query_string = location.search;
    if (query_string.length > 0) {
        let query = query_string.substring(1, query_string.length);
        if (page_types.includes(query)) {
            page_to_show = query;
        }
    }

    let test_fcn = test_methods[page_to_show];
    test_fcn();
});


function summary_frame_main() {
    // get the sample app data
    let sample_app = SAMPLE_APP;
    let frame = sample_app.summary;

    render_summary_frame(frame);
}

function words_frame_main() {
    // get the sample app data
    let sample_app = SAMPLE_APP;
    let frame = sample_app.body[3];

    render_words_frame(frame);
}

function statements_frame_main() {
    // get the sample app data
    let sample_app = SAMPLE_APP;
    let frame = sample_app.body[0];

    render_statements_frame(frame);
}




/**
 * Render a summary frame.
 * 
 * @param frame -- Object containing the frame's data. Expected fields:
 *    frame.title (string) -- The frame's title
 *    frame.description (string) -- Text to appear before the list of matched emotions
 *    frame.graphic (string) -- URL of an image to display
 *    frame.matched_emotions (object) -- list of matched emotions e with the following fields:
 *       type -- 'count' to display numeric match strength, 'qualifier' to display match strength
 *       [numeric keys] -- sequence of matched emotions e, with the following fields
 *         e.emotion -- the name of the emotion
 *         e.responses (list of string) (if type is count) -- list of matching user responses 
 *         e.qualifier (string) (if type is qualifier) -- string describing strength of the match
 *  Behavior undefined if frame does not have these properties.
 * 
 * @require -- DOM must have a div whose ID is 'frame'
 * 
 * @effects -- Does not preserve former content of <div id="frame">.
 *     Renders the data from the argument into that div.
 * 
 **/
function render_summary_frame(frame_data) {

    // make a new empty div with id frame, not yet in the dom
    let frame = document.createElement('div'); 
    $(frame).attr('id', 'frame');

    // insert a h2 node for the title
    let title = document.createElement('h2');
    $(title).text(frame_data.title);
    frame.appendChild(title);

    // insert a p node for the description
    let description = document.createElement('p');
    $(description).text(frame_data.description);
    frame.appendChild(description);

    let flex_div = document.createElement('div');
    $(flex_div).attr('class', 'flex');
    frame.appendChild(flex_div);

    // if there is a graphic, make a two-column layout and put the graphic on the left. 
    // there is a more object oriented way to do this check. Refactor.
    if ('graphic' in frame_data && frame_data.graphic.length > 0) {
        let graphic_col = document.createElement('div');
        $(graphic_col).attr('class', 'summary_graphic');
        let graphic_img = document.createElement('img');
        $(graphic_img).attr('src', frame_data.graphic);
        $(graphic_img).attr('class', 'summary_img');
        graphic_col.appendChild(graphic_img);
        flex_div.appendChild(graphic_col);
    }
    
    // If not, text will be the whole width.
    // (frame.graphic)
    let text_col = document.createElement('div');
    $(text_col).attr('class', 'summary_body');
    


    flex_div.appendChild(text_col);
    


    // branch on type of frame.matched_emotions (count or qualifier)
    // Iterate over matched emotions and put in a line for each
    //   element.emotion, element.responses



    let old_frame = $('#frame')[0];
    old_frame.replaceWith(frame);

}


/**
 * Render a frame whose template is 'words'. The words will be rendered as
 *   a list of checkboxes.
 * 
 * @param frame -- Object containing the frame's data. Expected fields:
 *    frame.template -- The exact string 'words'
 *    frame.title (string) -- The frame's title
 *    frame.question (string) -- Text to appear before the list of statements
 *    frame.words (list of string) -- Words that the user can check or uncheck
 *  Behavior undefined if frame does not have these properties.
 * 
 * @require -- DOM must have a div whose ID is 'frame'
 * 
 * @effects -- Does not preserve former content of <div id="frame">.
 *     Renders the data from the argument into that div.
 * 
 **/
function render_words_frame(frame) {
    // for now, just change words to statements and use the statement renderer
    // later, we might try using multiple columns.
    let st_frame = {
        'template': 'statements',
        'title': frame.title,
        'question': frame.question,
        'statements': frame.words,
    }
    render_statements_frame(st_frame);

}

/**
 * Render a frame whose template is 'statements'. The statements will be rendered as
 *   a list of checkboxes.
 * 
 * @param frame -- Object containing the frame's data. Expected fields:
 *    frame.template -- The exact string 'statements'
 *    frame.title (string) -- The frame's title
 *    frame.question (string) -- Text to appear before the list of statements
 *    frame.statements (list of string) -- Statements that the user can agree or disagree with
 *  Behavior undefined if frame does not have these properties.
 * 
 * @require -- DOM must have a div whose ID is 'frame'
 * 
 * @effects -- Does not preserve former content of <div id="frame">.
 *     Renders the data from the argument into that div.
 * 
 **/
function render_statements_frame(frame_data) {

    // make a new empty div with id frame, not yet in the dom
    let frame = document.createElement('div'); 
    $(frame).attr('id', 'frame');
    
    // insert a h2 node for the title
    let title = document.createElement('h2');
    $(title).text(frame_data.title);
    frame.appendChild(title);

    // insert a p node for the question
    let question = document.createElement('p');
    $(question).text(frame_data.question);
    frame.appendChild(question);
    
    // Insert a checkbox list for the statements
    let statements = document.createElement('div');
    let i = 0;
    for (let statement of frame_data.statements) {
        let name = 'stmt' + i;
        i += 1;

        // the actual checkbox
        let input = document.createElement('input');
        $(input).attr('type', 'checkbox');
        $(input).attr('name', name);
        statements.appendChild(input);

        // label that can also be clicked to select the checkbox
        let label = document.createElement('label');
        $(label).attr('for', name);
        $(label).text(statement);
        statements.appendChild(label);
        
        statements.appendChild(document.createElement('br'));
    }
    frame.appendChild(statements);

    let old_frame = $('#frame')[0];
    old_frame.replaceWith(frame);

}

/**
Example object to render

{
    'template': 'statements',
    'title': 'Kittens',
    'question': 'Which is the best part of a kitten?',
    'statements': [
        'its purr',
        'its floof',
        'its bark',
    ],
},

**/
