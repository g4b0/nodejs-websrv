var util = require('util');
var initreq = require('./initreq.js');

exports.serve = function (req, res) {
    var pre = {};
    initreq.initGET(req, pre, function () {
        initreq.initPOST(req, pre, function () {
            initreq.initCOOKIE(req, pre, function () {
                initreq.initREQUEST(req, pre, function () {
                    initreq.initSESSION(req, pre, function () {
                        page(req, res, pre, function () {
                            var cookies = [];
                            for (var c in pre._COOKIE) {
                                cookies.push(c + '=' + pre._COOKIE[c]);
                            }
                            res.setHeader('Set-Cookie', cookies);
                            res.writeHead(200, {'Content-Type': 'text/plain'});
                            
                            res.end(res.content);
                        });
                    });
                });
            });
        });
    });
};

function page(req, res, pre, cb) {

    var cnt = initreq.sessionGET(pre, 'cnt');
    if (cnt === undefined) {
        cnt = 0;
    }
    cnt++;
    initreq.sessionSET(pre, 'cnt', cnt);
    
    if (cnt >= 5) {
        initreq.sessionDEL(pre, 'cnt');
    }

    res.content = 'test_node ' + cnt + '\n' + util.inspect(pre);
    cb();
}
