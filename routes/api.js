//Create the AlchemyAPI object
var AlchemyAPI = require('../alchemy/alchemyapi');
var alchemyapi = new AlchemyAPI();
var fs = require('fs');

/*
 * Serve JSON to our AngularJS client
 */
exports.name = function (req, res) {
    res.json({
        name: 'Aruna Tebel'
    });
};


exports.entities = function entities(req, res, text) {
    //var obj;
    //fs.readFile('jsontmp/entities_response.json', 'utf8', function (err, data) {
    //    if (err) throw err;
    //    obj = JSON.parse(data);
    //    res.json(obj);
    //});
    alchemyapi.entities('text', text, {'sentiment': 1}, function (response) {
        //res.json({
        //    text: text,
        //    response: JSON.stringify(response, null, 4),
        //    results: response['entities']
        //});
        res.send(JSON.stringify(response));
    });
};


exports.keywords = function keywords(req, res, text) {
    alchemyapi.keywords('text', text, {'sentiment': 1}, function (response) {
        res.send(JSON.stringify(response));
    });
};

exports.relations = function relations(req, res, text) {
    alchemyapi.relations('text', text, {}, function (response) {
        res.send(JSON.stringify(response));
    });
};

exports.concepts = function concepts(req, res, text) {
    alchemyapi.concepts('text', text, {'showSourceText': 1}, function (response) {
        res.send(JSON.stringify(response));
    });
};

exports.textCategory = function category(req, res, text) {
    alchemyapi.category('text', text, {}, function (response) {
        res.send(JSON.stringify(response));
    });
};

// todo
exports.taxonomy = function taxonomy(req, res, url) {
    alchemyapi.taxonomy('url', url, {}, function (response) {
        res.send(JSON.stringify(response));
    });
};


function sentiment(req, res, output) {
    alchemyapi.sentiment('html', demo_html, {}, function (response) {
        output['sentiment'] = {
            html: demo_html,
            response: JSON.stringify(response, null, 4),
            results: response['docSentiment']
        };
        text(req, res, output);
    });
}


function text(req, res, output) {
    alchemyapi.text('url', demo_url, {}, function (response) {
        output['text'] = {url: demo_url, response: JSON.stringify(response, null, 4), results: response};
        author(req, res, output);
    });
}


function author(req, res, output) {
    alchemyapi.author('url', demo_url, {}, function (response) {
        output['author'] = {url: demo_url, response: JSON.stringify(response, null, 4), results: response};
        language(req, res, output);
    });
}


function language(req, res, output) {
    alchemyapi.language('text', demo_text, {}, function (response) {
        output['language'] = {text: demo_text, response: JSON.stringify(response, null, 4), results: response};
        title(req, res, output);
    });
}


function title(req, res, output) {
    alchemyapi.title('url', demo_url, {}, function (response) {
        output['title'] = {url: demo_url, response: JSON.stringify(response, null, 4), results: response};
        relations(req, res, output);
    });
}


function feeds(req, res, output) {
    alchemyapi.feeds('url', demo_url, {}, function (response) {
        output['feeds'] = {url: demo_url, response: JSON.stringify(response, null, 4), results: response['feeds']};
        microformats(req, res, output);
    });
}


function microformats(req, res, output) {
    alchemyapi.microformats('url', demo_url, {}, function (response) {
        output['microformats'] = {
            url: demo_url,
            response: JSON.stringify(response, null, 4),
            results: response['microformats']
        };
        taxonomy(req, res, output);
    });
}


function combined(req, res, output) {
    alchemyapi.combined('url', demo_url, {}, function (response) {
        output['combined'] = {url: demo_url, response: JSON.stringify(response, null, 4), results: response};
        image(req, res, output);
    });
}

function image(req, res, output) {
    alchemyapi.image('url', demo_url, {}, function (response) {
        output['image'] = {url: demo_url, response: JSON.stringify(response, null, 4), results: response};
        image_keywords(req, res, output);
    });
}

function image_keywords(req, res, output) {
    alchemyapi.image_keywords('url', demo_url, {}, function (response) {
        output['image_keywords'] = {url: demo_url, response: JSON.stringify(response, null, 4), results: response};
        res.render('example', output);
    });
}