const inputBox = document.getElementById('input-box');
const outputBox = document.getElementById('output-box');

const generateTweetButton = document.getElementById('generate-tweet-button');
const postTweetButton = document.getElementById('post-tweet-button');

// ChatGPT API
const chatgptClient = new OpenAI('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');

// Twitter API
const Twitter = require('twitter');
const OAuth = require('oauth').OAuth;

const oauth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    'SIgs2cjfj7oCHMW8P8ZMiGXKf',
    'YWKOfKgqGPWkdjGTj5rwSn66uk3jSVurGx7wR3RKUCDRujCv7c',
    '2.0',
    null,
    'HMAC-SHA1'
);

const twitterClient = new Twitter({
    consumer_key: 'SIgs2cjfj7oCHMW8P8ZMiGXKf',
    consumer_secret: 'YWKOfKgqGPWkdjGTj5rwSn66uk3jSVurGx7wR3RKUCDRujCv7c',
    access_token_key: '1627138527472283657-0OLvT7tOTb3Tmb4zDIdGa3LvtYT8Xn',
    access_token_secret: 'sTGB9m5RsAhACabRQuiu4iYVXQiglDEPYzM2JhioNqdWe',
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000),
    oauth_nonce: require('crypto').randomBytes(32).toString('hex')
});

function generateTweet() {
    const inputText = inputBox.value;

    chatgptClient.complete({
    engine: 'text-davinci-002',
    prompt: inputText,
    maxTokens: 50,
    n: 1,
    stop: '\n',
    temperature: 0.5
    }).then((response) => {
    const generatedText = response.data.choices[0].text.trim();

    outputBox.value = generatedText;
    }).catch((error) => {
    outputBox.value = `Error generating tweet: ${error}`;
    });
}

function postTweet() {
    const tweetText = outputBox.value;

    twitterClient.post('statuses/update', { status: tweetText }).then((tweet) => {
    outputBox.value = `Tweet posted successfully:\n${tweet.text}`;
    }).catch((error) => {
    outputBox.value = `Error posting tweet: ${error}`;
    });
}

generateTweetButton.addEventListener('click', generateTweet);
postTweetButton.addEventListener('click', postTweet);