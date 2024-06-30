const MAX_CHARS = 150;
const BASE_API_URL = 'https://taiwan-says.onrender.com/api/entries'

const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter')
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks')
const submitBtnEl = document.querySelector('.submit-btn')
const spnnerEl = document.querySelector('.spinner')
const hashtagListEl = document.querySelector('.hashtags')

const calculateDateDifference = (dateString) => {
    
    const pastDate = new Date(dateString);
    // Get the current date
    const currentDate = new Date();
    
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = currentDate - pastDate;

    // Convert milliseconds to days
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    return differenceInDays;
};

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

// Creates a HTML feedback item that will be inserted to the end of the list 
const renderFeedbackItem = entry => {
    // console.log(entry);
    const daysago = calculateDateDifference(entry.date);
    // insert new feedback item HTML
    const feedbackItemHTML = `
        <li class="feedback" data-id="${entry._id}">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${entry.thumbsup}</span>
            </button>

            <section class="feedback__badge">
                <p class="feedback__letter">${entry.hashtag[0].toUpperCase()}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${entry.hashtag}</p>
                <p class="feedback__text">${entry.sentenceNotSaid}</p>
            </div>
            <p class="feedback__date">${daysago === 0 ? 'new' : `${daysago}d`}</p>
        </li>
    `;

    // insert new feedback item in list
    feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);
}

// -- COUNTER COMPONENT --
const inputHandler = () => {
    const maxNrChars = MAX_CHARS;
    const nrCharsTyped = textareaEl.value.length
    const charsLeft = maxNrChars - nrCharsTyped;
    counterEl.textContent = charsLeft;
}

textareaEl.addEventListener('input', inputHandler);

// -- Form Component --
const showVisualIndicator = (valid) => {
        const textCheck = valid === true ? 'form--valid' : 'form--invalid'
    // show indicator
        formEl.classList.add(textCheck);
        
        // remove visual indicator
        setTimeout(() => {
            formEl.classList.remove(textCheck);
        }, 2000);
}


const submitHandler = event => {
    // prevent default browser action (submitting form data to 'action'-address and refreshing page)
    event.preventDefault();
    
    // get text from textarea
    const text = textareaEl.value;

    // validate text (e.g. check if #hashtag is present and text is long enough)
    if (text.includes('#') && text.length >= 5) {
        showVisualIndicator(true)

    } else {
        showVisualIndicator(false)
        // focus textarea
        textareaEl.focus()

        // stop this function execution
        return; 
    }

    // we have text, now extract other info from text

    const hashtags = text.split(' ').filter(word => word.startsWith('#'));
    const catagories = hashtags.map(hashtag => hashtag.substring(1));
    const thumbsup = 0;
    const date = formatDate(new Date());

    // render feedback item in list
    const entryItem = {
        sentenceNotSaid: text,
        hashtag: catagories[0],
        date: date,
        thumbsup: thumbsup,
    };
    renderFeedbackItem(entryItem);

    // send feedback item to server
    fetch(BASE_API_URL, {
        method: 'POST',
        body: JSON.stringify(entryItem),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok){
            console.log('Something went wrong')
            return;
        } else {
            console.log('Successfully submitted')
        }
    }).catch(error => console.log(error.message))
    
    // clear textarea
    textareaEl.value = ''
    // blur submit button
    submitBtnEl.blur();
    // reset counter
    counterEl.textContent = MAX_CHARS;
}
formEl.addEventListener('submit', submitHandler);


// -- FEEDBACK LIST COMPONENT --

const clickHandler = event => {
        // get clicked HTML element
        const clickedEl = event.target;

        // determing if user intented to upvote or expand
        const upvoteIntention = clickedEl.className.includes('upvote'); 

        // run the appropiete logic
        if (upvoteIntention) {
            // get the closest upvote element
            const upvoteBtnEl = clickedEl.closest('.upvote')

        // get the closest entry
        const entryEl = clickedEl.closest('.feedback');
                
        // fetch the ID of the entry
        const entryId = entryEl.dataset.id;

        // disable upvote button (prevent double clicks)
        upvoteBtnEl.disabled = true;
        
        // select the upvote count element within the upvote button
        const upvoteCountEl = upvoteBtnEl.querySelector('.upvote__count');

        // get currently dsplayed upvote count as number (+)
        let upvoteCount = +upvoteCountEl.textContent 
        
        // increment by 1, set upvote count
        upvoteCountEl.textContent = ++upvoteCount

        // save it to server
        const newThumbsup = {
            thumbsup : upvoteCount
        }
        updateEntry(entryId, newThumbsup)

    } else {
        // expand the feedback
        clickedEl.closest('.feedback').classList.toggle('feedback--expand')
    }
}
feedbackListEl.addEventListener('click', clickHandler)


// -- DEFAULT LIST --
fetch(BASE_API_URL)
    .then(response => response.json())
    .then(data => {
        // remove spinner
        spnnerEl.remove();
        // iterate over each element in feedbacks array and render it in list
        data.forEach(feedback => renderFeedbackItem(feedback))
    })
    .catch(error => {
        feedbackListEl.textContent = `Failed to fetch feedback items. Error message: ${error.message}`
    })

// -- HASH COMPONENT --

const clickHandler2 = event => {
    // get the clicked element
    const clickedEl = event.target;

    // stop function if click happened in list, but outside buttons
    if (clickedEl.className === 'hashtags') return;

    // extract company name
    const companyNameFromHashTag = clickedEl.textContent.substring(1).toLowerCase().trim();
    
    // iterate over each feedback item in the list
    feedbackListEl.childNodes.forEach(childnode => {
        // stop this iteration if it's a text node
        if (childnode.nodeType === 3) return;

        // extract company name
        const companyNameFromFeedbackItem = childnode.querySelector('.feedback__company').textContent.toLowerCase().trim();
        
        // remove feedback item from list if company names are not equal
        if (companyNameFromHashTag !== companyNameFromFeedbackItem) {
            childnode.remove();
        }
    })
}

hashtagListEl.addEventListener('click', clickHandler2)


 
const updateEntry = (id, body) => {
    fetch(`${BASE_API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body), // Corrected this line
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json()) // Parse JSON response
        .then(data => console.log(data)) // Log the response data
        .catch(error => {
            console.log({ message: error });
        });
}
