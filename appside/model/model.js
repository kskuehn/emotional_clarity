"use strict";


/**
 * Abstract supertype for all variants of model
 */
class Model {

    /**
     * Construct model
     */
    constructor() {
        if (new.target == Model) {
            throw new TypeError('cannot construct Model directly (use child)');
        }
        Model.emotion_selection_frame = {
            'template': 'emotion_selection',
        }
    }

    /**
     * Pass user input into the model
     * @param input - Map of data to be absorbed by the model
     */
    update(input) {
    }

    /**
     * Get next frame from the model
     * @return an object containing data for the next frame, based on
     *     the model's internal structure, and input passed in so far
     */
    next_frame() {
        let ret = {};
        return ret;
    }
}
