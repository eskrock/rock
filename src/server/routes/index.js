module.exports = function(app) {
    var api = '/api/';
    var data = '/../data/';
    var jsonfileservice = require('../utils/jsonfileservice')();
    var contractsJson = jsonfileservice.getJsonFromFile(data + 'contracts.json');
    var subcontractorsJson = jsonfileservice.getJsonFromFile(data + 'subcontractors.json');
    var workclassificationJson = jsonfileservice.getJsonFromFile(data + 'workclassifications.json');
    var payrolls = [];
    var four0four = require('../utils/404')();

    app.get(api + 'contracts', getContracts);
    app.post(api + 'contracts', postContract);
    app.get(api + 'contracts/:id', getContract);
    app.put(api + 'contracts/:id', putContract);
    app.get(api + 'contracts/:id/subcontractors', getSubcontractorsOfAContract);
    app.get(api + 'contracts/:id/workclassifications', getWorkClassificationsOfAContract);

    /* Sub-contractors*/
    app.get(api + 'subcontractors', getSubcontractors);
    app.post(api + 'subcontractors', postSubcontractor);

    /* Work-classifications*/
    app.get(api + 'workclassifications', getWorkClassifications);
    app.post(api + 'workclassifications', postWorkClassification);

    /* Payrolls */
    app.post(api + 'payrolls', postPayroll);
    app.get(api + 'payrolls/:id', getPayroll);

    app.get(api + '*', four0four.notFoundMiddleware);

    //==================================================================

    function postPayroll(req, res) {
        var id = payrolls.length + 1;
        req.body.id = id;
        payrolls.push(req.body);
        res.send({ 'id': id });
        res.status(201).end();
    }

    function getPayroll(req, res, next) {
      var id = req.params.id;
      var msg = 'Payroll id ' + id + ' not found. ';
      try {
          var payroll = payrolls.filter(function(p) {
              return p.id === id;
          });
          if (payroll) {
              res.send(payroll);
          } else {
              four0four.send404(req, res, msg);
          }
      }
      catch (ex) {
          four0four.send404(req, res, msg + ex.message);
      }
    }

    /* jshint -W106 */
    function getWorkClassificationsOfAContract(req, res, next) {
        var id = req.params.id;
        var msg = 'contract id ' + id + ' not found. ';
        try {
            var subcontractors = workclassificationJson.filter(function(c) {
                return c.contract_number === id;
            });
            if (subcontractors) {
                res.send(subcontractors);
            } else {
                four0four.send404(req, res, msg);
            }
        }
        catch (ex) {
            four0four.send404(req, res, msg + ex.message);
        }
    }

    function getWorkClassifications(req, res, next) {
        var msg = 'Work Classifications not found. ';
        try {
            if (workclassificationJson) {
                res.send(workclassificationJson);
            } else {
                four0four.send404(req, req, msg);
            }
        }
        catch (ex) {
            four0four.send404(req, res, msg + ex.message);
        }
    }

    function postWorkClassification(req, res) {
        workclassificationJson.push(req.body);
        res.send({ 'id': req.body.id });
        res.status(201).end();
    }

    //==================================================================
    /* jshint -W106 */
    function getSubcontractorsOfAContract(req, res, next) {
        var id = req.params.id;
        var msg = 'contract id ' + id + ' not found. ';
        try {
            var subcontractors = subcontractorsJson.filter(function(c) {
                return c.contract_number === id;
            });
            if (subcontractors) {
                res.send(subcontractors);
            } else {
                four0four.send404(req, res, msg);
            }
        }
        catch (ex) {
            four0four.send404(req, res, msg + ex.message);
        }
    }

    function getSubcontractors(req, res, next) {
        var msg = 'Sub Contractors not found. ';
        try {
            if (subcontractorsJson) {
                res.send(subcontractorsJson);
            } else {
                four0four.send404(req, req, msg);
            }
        }
        catch (ex) {
            four0four.send404(req, res, msg + ex.message);
        }
    }

    function postSubcontractor(req, res) {
        subcontractorsJson.push(req.body);
        res.send({ 'id': req.body.id });
        res.status(201).end();
    }

    //==================================================================

    function putContract(req, res) {
      var id = req.params.id;
      var msg = 'contract id ' + id + ' not found. ';
      try {
          var contract = contractsJson.filter(function(c) {
              return c.number === id;
          });
          if (contract && contract[0]) {
              contract[0] = req.params;
              res.status(200).end();
          } else {
              four0four.send404(req, res, msg);
          }
      }
      catch (ex) {
          four0four.send404(req, res, msg + ex.message);
      }
    }

    function postContract(req, res) {
        contractsJson.push(req.body);
        res.send({ 'number': req.body.number });
        res.status(201).end();
    }

    function getContract(req, res, next) {
        var id = req.params.id;
        var msg = 'contract id ' + id + ' not found. ';
        try {
            var contract = contractsJson.filter(function(c) {
                return c.number === id;
            });
            if (contract && contract[0]) {
                res.send(contract[0]);
            } else {
                four0four.send404(req, res, msg);
            }
        }
        catch (ex) {
            four0four.send404(req, res, msg + ex.message);
        }
    }

    function getContracts(req, res, next) {
        var msg = 'contracts not found. ';
        try {
            if (contractsJson) {
                res.send(contractsJson);
            } else {
                four0four.send404(req, req, msg);
            }
        }
        catch (ex) {
            four0four.send404(req, res, msg + ex.message);
        }
    }
};
