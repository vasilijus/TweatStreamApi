const http      = require('http');
const path      = require('path');
const express   = require('express');
const socketIo  = require('socket.io');
const needle    = require('needle');

const config    = require('dotenv').config();
const TOKEN     = process.env.TWITTER_BEARER_TOKEN;
const PORT      = process.env.PORT || 3001;

const basURL    = 'https://api.twitter.com';
const rulesURL  = basURL+'/2/tweets/search/stream/rules';
const streamURL = basURL+'/2/tweets/search/stream?tweet.fields=public_metrics&expansions=author_id';

const rules = [
    { value: 'giveaway' },
     { value: 'xbox' }
];

// Get stream rules
async function getRules() {
    const response = await needle('get', rulesURL, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    });
    console.log(response.body);
    return response.body;
}
// Set stream rules
async function setRules() {
    const data = {
        add: rules,
    }
    const response = await needle('post', rulesURL, data, {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        }
    });
    return response.body;
}
// Delete stream rules
async function deleteRules(rules) {
    if( !Array.isArray(rules.data) ) {
        return null;
    }

    // Array
    const ids = rules.data.map((rule) => {
        return rule.id;
    });

    const data = {
        delete: {
            ids: ids
        }
    }

    const response = await needle('post', rulesURL, data, {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${TOKEN}`
        }
    })
    return response.body;
}

(async () => {
    let currentRules;

    try {
        // Get all stream rules
        currentRules = await getRules();

        // Delete all stram rules
        await deleteRules(currentRules);
        
        // Set rules base on array above 
        await setRules();
    } catch(error) {
        console.error(error);
        process.exit(1);
    }

    function streamTweats() {
        const stream = needle.get(streamURL, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
            
        })
        stream.on('data', (data) => {
            try {
                const json = JSON.parse(data);
                console.log(json);
            } catch (error) {}
        })
    }

    streamTweats();
    
})()

